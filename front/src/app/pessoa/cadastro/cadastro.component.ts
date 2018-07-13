import { Component, OnInit } from '@angular/core';

import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import {PessoaService} from '../../services/pessoa.service';

import {Pessoa} from '../../services/pessoa';

import {Response} from '../../services/response';

import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-cadastro-pessoa',
    templateUrl: './cadastro.component.html',
    styleUrls:["./cadastro.component.css"]
  })
  export class CadastroComponent implements OnInit {
  
    private titulo:string;
    private pessoa:Pessoa = new Pessoa();

    constructor(private pessoaService: PessoaService,
                private router: Router,
                private activatedRoute: ActivatedRoute){}
  
    /*CARREGADO NA INICIALIZAÇÃO DO COMPONENTE */
    ngOnInit() {
      
      this.activatedRoute.params.subscribe(parametro=>{
        
        
        if(parametro["codigo"] == undefined){
          
          this.titulo = "Novo Cadastro de Pessoa";
        }
        else{

          this.titulo = "Editar Cadastro de Pessoa";
          this.pessoaService.getPessoa(Number(parametro["codigo"])).subscribe(res => this.pessoa = res);
        }
      

      });      
    }

    salvar():void {
    
      if(this.pessoa.codigo == undefined){
        
        this.pessoaService.addPessoa(this.pessoa).subscribe(response => {
            
           let res:Response = <Response>response;
                
           if(res.codigo == 1){
            alert(res.mensagem);
            this.pessoa = new Pessoa();
           }
           else{
             alert(res.mensagem);
           }
         },
         (erro) => {   
            alert(erro);
         });

      }
      else{

        this.pessoaService.atualizarPessoa(this.pessoa).subscribe(response => {
          
        let res:Response = <Response>response;
        if(res.codigo == 1){
          alert(res.mensagem);
          this.router.navigate(['/consulta-pessoa']);
        }
         else{
           alert(res.mensagem);
         }
       },
       (erro) => {                    
          alert(erro);
       });
      }

    }
  
  }