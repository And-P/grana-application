package me.umbrella.grana.api.config;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.BucketLifecycleConfiguration;
import com.amazonaws.services.s3.model.CreateBucketRequest;
import com.amazonaws.services.s3.model.Tag;
import com.amazonaws.services.s3.model.lifecycle.LifecycleFilter;
import com.amazonaws.services.s3.model.lifecycle.LifecycleTagPredicate;
import me.umbrella.grana.api.config.property.GranaApiProperty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AwsS3Config {

    @Autowired
    private GranaApiProperty property;


    @Bean
    public AmazonS3 amazonS3() {
        AWSCredentials credentials = new BasicAWSCredentials(property.getAwsS3().getAccessKeyId(), property.getAwsS3().getSecretAccessKey());

        AmazonS3 amazonS3 = AmazonS3ClientBuilder.standard()
                                                 .withCredentials(new AWSStaticCredentialsProvider(credentials))
                                                 .withRegion(Regions.US_EAST_1)
                                                 .build();

        // Cria o Bucket S3 via código. (sem esse codigo teriamos que já ter o Bucket criado na S3)
        if (!amazonS3.doesBucketExistV2(property.getAwsS3().getBucket())) {

            amazonS3.createBucket(new CreateBucketRequest(property.getAwsS3().getBucket()));

            BucketLifecycleConfiguration.Rule regraDeExpiracao = new BucketLifecycleConfiguration
                                                                     .Rule()
                                                                     .withId("Regra de expiração de arquivos temporários")
                                                                     .withFilter(new LifecycleFilter(new LifecycleTagPredicate(new Tag("expirar", "true"))))
                                                                     .withExpirationInDays(1)
                                                                     .withStatus(BucketLifecycleConfiguration.ENABLED);

            BucketLifecycleConfiguration configuration = new BucketLifecycleConfiguration().withRules(regraDeExpiracao);

            amazonS3.setBucketLifecycleConfiguration(property.getAwsS3().getBucket(), configuration);
        }

        return amazonS3;
    }


}
