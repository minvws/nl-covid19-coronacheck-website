<?php
/* Simple script to store Field Labs Sign up data in the database.
 *
 * Post Parameters: email (text), privacy (checkbox), feedbackmail (checkbox), app (string)
 * SQL Table:

CREATE TABLE FieldLabsSignUp (
    email VARCHAR(364) NOT NULL,
    privacy BOOLEAN NOT NULL DEFAULT FALSE,
    feedbackmail BOOLEAN NOT NULL DEFAULT FALSE,
    app VARCHAR(30) NOT NULL,
    client_key VARCHAR(44) NOT NULL,
    nonce VARCHAR(32) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

 */

try {
    // Get Server Public Key from ENV
    $serverKeyPublic = base64_decode(getenv('PUBKEY_CLIENT'));

    // Generate Encryption Key
    $clientKey = sodium_crypto_box_keypair();
    $clientKeySecret = sodium_crypto_box_secretkey($clientKey);
    $clientKeyPublic = sodium_crypto_box_publickey($clientKey);
    $nonce = random_bytes(SODIUM_CRYPTO_BOX_NONCEBYTES);
    $encryptionKey = sodium_crypto_box_keypair_from_secretkey_and_publickey($clientKeySecret, $serverKeyPublic);

    // Load and Crypt Data fields
    $dataEncrypted = [];
    $dataEncrypted['email'] = base64_encode(sodium_crypto_box($_REQUEST['email'], $nonce, $encryptionKey));
    $dataEncrypted['privacy'] = (isset($_REQUEST['privacy']) && $_REQUEST['privacy'] == "on");
    $dataEncrypted['feedbackmail'] = (isset($_REQUEST['feedbackmail']) && $_REQUEST['feedbackmail'] == "on");
    $dataEncrypted['app'] = preg_replace("/[^A-Za-z0-9 _]/", '', $_REQUEST['app']);
    $dataEncrypted['nonce'] = base64_encode($nonce);
    $dataEncrypted['client_key'] = base64_encode($clientKeyPublic);

    // Connect to the database
    $dbHost = getenv('DB_HOST');
    $dbName = getenv('DB_DATABASE');
    $dbUser = getenv('DB_USERNAME');
    $dbPass = getenv('DB_PASSWORD');
    $dbSSLM = getenv('DB_SSLMODE');
    $dbSSLCA = getenv('DB_SSLROOTCERT');
    $dbSSLCert = getenv('DB_SSLCERT');
    $dbSSLKey = getenv('DB_SSLKEY');

    $databaseParams = [];
    $databaseParams[] = 'dbname='.$dbName;
    if (!empty($dbSSLM)) {
        $databaseParams[] = 'sslmode='.$dbSSLM;
        $databaseParams[] = 'sslrootcert='.$dbSSLCA;
        $databaseParams[] = 'sslcert='.$dbSSLCert;
        $databaseParams[] = 'sslkey='.$dbSSLKey;
    }


    $pdo = new PDO('pgsql:host='.$dbHost.';'.implode(";",$databaseParams).';', $dbUser, $dbPass);

    // Insert into the database
    $sql = 'INSERT INTO fieldlabs_signup (email, privacy, feedbackmail, app, client_key, nonce)
                VALUES (:email, :privacy, :feedbackmail, :app, :client_key, :nonce)';

    $stmt = $pdo->prepare($sql);
    $stmt->bindValue(':email', $dataEncrypted['email'],PDO::PARAM_STR);
    $stmt->bindValue(':privacy', $dataEncrypted['privacy'],PDO::PARAM_BOOL);
    $stmt->bindValue(':feedbackmail', $dataEncrypted['feedbackmail'],PDO::PARAM_BOOL);
    $stmt->bindValue(':app', $dataEncrypted['app'],PDO::PARAM_STR);
    $stmt->bindValue(':client_key', $dataEncrypted['client_key'],PDO::PARAM_STR);
    $stmt->bindValue(':nonce', $dataEncrypted['nonce'],PDO::PARAM_STR);
    $stmt->execute();

    // Set redirect url
    if($_REQUEST['app'] == 'iphone_version')
        $redirectUri = "/instructies-ios";
    else if($_REQUEST['app'] == 'android_version')
        $redirectUri = "/instructies-android";
    else
        $redirectUri = "/500";

} catch (Exception $e) {
    $redirectUri = "/500";
}

// Set redirect URL
$redirectUrl = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http").'://'.$_SERVER['HTTP_HOST'].$redirectUri;

// Redirect client
header('Location: '.$redirectUrl);
