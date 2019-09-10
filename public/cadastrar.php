<?php

include "conexao.php";
    
    $nome  = $_POST['nome_app'];
    $cpf   = $_POST['cpf_app'];
    $email = $_POST['email_app'];
    $senha = $_POST['senha_app'];
    $csenha = $_POST['csenha_app'];
    $nascimento = $_POST['dtnas_app'];
    $telefone = $_POST['tele_app'];
    $categoria = $_POST['categoria_app'];
    $retornoApp;
    
    $slq_verifica = "SELECT * FROM usuario WHERE cpf = :CPF";
    $stmt = $PDO ->prepare($slq_verifica);
    $stmt->bindParam(':CPF', $cpf);
    $stmt->execute();
    
    if($stmt->rowCount() > 0){
        //CPF ja esta cadastrado
        $retornoApp = array("CADASTRO"=>"CPF_ERRO");
        
    } else{
        
        $sql_insert = "INSERT INTO usuario(cpf, nome, email, senha, nascimento, telefone, nomecateg) VALUES (:CPF, :NOME, :EMAIL,:SENHA, :DTNAS, :TEL, :CATEG)";
        $stmt = $PDO->prepare($sql_insert);
        
        $stmt->bindParam(':CPF', $cpf);
        $stmt->bindParam(':NOME', $nome);
        $stmt->bindParam(':EMAIL', $email);
        $stmt->bindParam(':SENHA', $senha);
        $stmt->bindParam(':DTNAS', $nascimento);
        $stmt->bindParam(':TEL', $telefone);
        $stmt->bindParam(':CATEG', $categoria);
        
        if($stmt->execute()) {
            $retornoApp = array ("CADASTRO"=>"SUCESSO");         
        } else{
         $retornoApp = array("CADASTRO"=>"ERRO");
        }	
     }

    echo json_encode($retornoApp);

    
