<?php
define('HOST', 'localhost');
define('USER', 'root');
define('PASSWORD', 'App$ustenta');
define('DB', 'sustenta');

$PDO = new PDO( 'mysql:host=' . HOST . ';dbname=' . DB, USER, PASSWORD );

try
{
    $PDO = new PDO( 'mysql:host=' . HOST . ';dbname=' . DB, USER, PASSWORD );
}
catch ( PDOException $e )
{
    echo 'Erro ao conectar com o MySQL: ' . $e->getMessage();
}

