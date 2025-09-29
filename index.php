<?php
$files = scandir("./shapes");
$files = array_filter($files, fn(string $f) => !str_starts_with($f, "."));
?>

<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BHJ Shapes</title>
</head>

<body>
    <pre><?php var_dump($files) ?></pre>
</body>

</html>