import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { DashboardService } from './../dashboard.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

pieChartData: any;
  // pieChartData = {
  //   labels: ['Mensal', 'Educação', 'Lazer', 'Imprevistos'],
  //   datasets: [
  //     {
  //       data: [2500, 2700, 550, 235, 1568],
  //       backgroundColor: ['#FF9900', '#109618', '#990099', '#3B3EAC', '#DC3912']
  //     }
  //   ]
  // };
lineChartData: any; 
  // lineChartData = {
  //   labels: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
  //   datasets: [
  //     {
  //       label: 'Receitas',
  //       data: [4, 10, 18, 5, 1, 20, 3],
  //       borderColor: '#3366CC'
  //     }, {
  //       label: 'Despesas',
  //       data: [10, 15, 8, 5, 1, 7, 9],
  //       borderColor: '#D62B00'
  //     }
  //   ]
  // };


  constructor(private dashboardService: DashboardService,
              private decimalPipe: DecimalPipe) { }

  optionsPie = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any): any => {
            let label = context.label || '';
            let value = context.raw || 0;
            let formattedValue = this.decimalPipe.transform(value, '1.2-2', 'pt_BR');
            return `${label}: ${formattedValue}`;
          }
        }
      }
    }
  }

  optionsLine = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any): any => {
            let label = context.dataset.label || '';
            let value = context.raw || 0;
            let formattedValue = this.decimalPipe.transform(value, '1.2-2', 'pt_BR');
            return `${label}: ${formattedValue}`;
          }
        }
      }
    }
  }


  ngOnInit(): void {
    this.configurarGraficoPizza();
    this.configurarGraficoLinha();
  }

  configurarGraficoPizza() {
    this.dashboardService.lancamentosPorCategoria()
      .then(dados => {
        this.pieChartData = {
          labels: dados.map(dado => dado.categoria.nome),
          datasets: [
            {
              data: dados.map(dado => dado.total),
              backgroundColor: ['#FF9900', '#109618', '#990099', '#3B3EAC', '#DC3912']
            }
          ]
        };
      });
  }

  configurarGraficoLinha() {
    this.dashboardService.lancamentosPorDia()
      .then(dados => {
        
        const diasDoMes = this.configurarDiasMes();

        const totaisReceitas = this.totaisPorCadaDiaMes(
          dados.filter(dado => dado.tipoLancamento === 'RECEITA'), 
          diasDoMes);

        const totaisDespesas = this.totaisPorCadaDiaMes(
          dados.filter(dado => dado.tipoLancamento === 'DESPESA'), diasDoMes);

        this.lineChartData = {
          labels: diasDoMes,
          datasets: [
            {
              label: 'Receitas',
              data: totaisReceitas,
              borderColor: '#3366CC'
            }, {
              label: 'Despesas',
              data: totaisDespesas,
              borderColor: '#D62B00'
            }
          ]
        }
      });
  }

  private totaisPorCadaDiaMes(dados: any, diasDoMes: any) {
    const totais: number[] = [];

    for (const dia of diasDoMes) {
      let total = 0;

      for (const dado of dados) {
        if (dado.dia.getDate() === dia) {
          total = dado.total;
          break;
        }
      }

      totais.push(total);
    }

    return totais;
  }

  private configurarDiasMes() {
    const mesReferencia = new Date();
          
          // PEGA O ULTIMO DIA DO MES ANTERIOR
          mesReferencia.setMonth(mesReferencia.getMonth() + 1);
          mesReferencia.setDate(0);
    
    const quantidade = mesReferencia.getDate();

    const dias: number[] = [];

    for (let i = 1; i <= quantidade; i++) {
      dias.push(i);
    }

    return dias;
  }

}
