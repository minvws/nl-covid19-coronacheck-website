<?php
/**
 * Redirect to Universal Link
 */

// Input parameters to pass on.
$redirectUri = $_REQUEST["redirect_uri"];
$clientId = $_REQUEST["client_id"];
$state = $_REQUEST["state"];
$host = $_SERVER["HTTP_HOST"];


$redirect = match ($host) {
    "coronacheck.nl" => "coronacheck://auth/login",
    "web.acc.coronacheck.nl" => "coronacheck-acc://auth/login",
    "web.tst.coronacheck.nl" => "coronacheck-tst://auth/login",
    "web.dev.coronacheck.nl" => "coronacheck-dev://auth/login",
    default => null,
};

// Validate redirectUri.
if (
    str_starts_with($redirectUri, "https://coronacheck.nl")
    || str_starts_with($redirectUri, "https://web.acc.coronacheck.nl")
    || str_starts_with($redirectUri, "https://web.tst.coronacheck.nl")
    || str_starts_with($redirectUri, "https://web.dev.coronacheck.nl")
) {
    // Host is allowed as redirect url, continue
}
else {
    http_response_code(400);
    exit();
}


if (!is_null($redirect)) {
    $redirectFullUrl = $redirect . "?" . http_build_query(["redirect_uri" => $redirectUri, "client_id" => $clientId, "state" => $state]);
}
else {
    http_response_code(400);
    exit();
}

http_response_code(302);
header("Location: " . $redirectFullUrl);

?>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>CoronaCheck Redirect</title>
    <meta http-equiv="refresh" content="0;URL='<?php echo $redirectFullUrl; ?>'" />
</head>
<body>
<p>This page has moved to <a href="<?php echo $redirectFullUrl ?>"></a>.</p>
</body>
</html>
