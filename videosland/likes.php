<?php
// Arquivo para armazenar o total de likes
$file = __DIR__ . '/likes.txt';
$ipFile = __DIR__ . '/likes_ips.txt';

// Se o arquivo não existir, cria com valor 0
if (!file_exists($file)) {
    file_put_contents($file, '0');
}
if (!file_exists($ipFile)) {
    file_put_contents($ipFile, '');
}

// Função para ler likes
function getLikes($file) {
    return intval(file_get_contents($file));
}

// Função para verificar se IP já curtiu
function hasLiked($ipFile, $ip) {
    $ips = file($ipFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    return in_array($ip, $ips);
}

// Função para registrar IP
function registerLikeIP($ipFile, $ip) {
    file_put_contents($ipFile, $ip . "\n", FILE_APPEND | LOCK_EX);
}

// Função para incrementar likes
function addLike($file) {
    $fp = fopen($file, 'c+');
    if (flock($fp, LOCK_EX)) {
        $likes = intval(fread($fp, filesize($file)));
        $likes++;
        ftruncate($fp, 0);
        rewind($fp);
        fwrite($fp, $likes);
        fflush($fp);
        flock($fp, LOCK_UN);
        fclose($fp);
        return $likes;
    } else {
        fclose($fp);
        return false;
    }
}

// CORS para permitir requisições do seu domínio
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

// GET: retorna likes
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    echo json_encode(['likes' => getLikes($file)]);
    exit;
}

// POST: incrementa likes se IP ainda não curtiu
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $ip = $_SERVER['REMOTE_ADDR'];
    if (hasLiked($ipFile, $ip)) {
        // Já curtiu, retorna o valor atual
        echo json_encode(['likes' => getLikes($file), 'alreadyLiked' => true]);
        exit;
    }
    $newLikes = addLike($file);
    if ($newLikes !== false) {
        registerLikeIP($ipFile, $ip);
        echo json_encode(['likes' => $newLikes, 'alreadyLiked' => false]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Could not update likes']);
    }
    exit;
}

// Outros métodos não permitidos
http_response_code(405);
echo json_encode(['error' => 'Method not allowed']); 