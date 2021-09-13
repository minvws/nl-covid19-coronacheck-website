<?php

$code = $_REQUEST["code"];
$state = $_REQUEST["state"];
$host = $_SERVER["HTTP_HOST"];

$redirect = match ($host) {
    "www.coronacheck.nl" => "coronacheck://auth/login",
    "coronacheck.nl" => "coronacheck://auth/login",
    "web.acc.coronacheck.nl" => "coronacheck-acc://auth/login",
    "web.tst.coronacheck.nl" => "coronacheck-tst://auth/login",
    "web.dev.coronacheck.nl" => "coronacheck-dev://auth/login",
    default => null,

};

$redirectFullUrl = $redirect . "?code=".rawurlencode($code) . "&state=" . rawurlencode($state);

header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

http_response_code(302);
header("Location: ".$redirectFullUrl);

?>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>CoronaCheck Redirect</title>
    <meta http-equiv="refresh" content="0;URL='<?php echo $redirectFullUrl; ?>'" />
</head>
<body>
<p>Open the CoronaCheck App: <a href="<?php echo $redirectFullUrl; ?>"><?php echo $redirectFullUrl; ?></a>.</p>
</body>
</html>
