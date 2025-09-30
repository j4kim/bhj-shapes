<?php
$files = scandir("./shapes");
$files = array_filter($files, fn(string $f) => !str_starts_with($f, "."));
$files = array_values($files);
?>

<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BHJ Shapes</title>
    <link rel="stylesheet" href="src/app.css">
    <link rel="shortcut icon" href="favicon.png" type="image/png">
</head>

<body data-files="<?= htmlspecialchars(json_encode($files)) ?>" class="overflow-x-hidden">
    <div id="app"></div>

    <script src="src/app.js" type="module"></script>
</body>

</html>