<?php

include "conexao.php";
    
    $cpf   = $_POST['cpf_app'];
    $senha = $_POST['senha_app'];

    $slq_verifica = "SELECT * FROM usuario WHERE cpf = :CPF AND senha = :SENHA";
    $stmt = $PDO->prepare($slq_verifica);
    $stmt->bindParam(':CPF', $cpf);
    $stmt->bindParam(':SENHA', $senha);
    $stmt->execute();
    
    if($stmt->rowCount() > 0){
        
       setcookie("login",$login);
          header("Location:home.html");
        
    } else {
        
        echo"<script language='javascript' type='text/javascript'>alert('Login e/ou senha incorretos');window.location.href='index.html';</script>";
          die();
        
    }
    
    echo json_encode($retornoApplog)
    ?>
