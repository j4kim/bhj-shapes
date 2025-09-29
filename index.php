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

    <script src="https://unpkg.com/konva@10/konva.min.js"></script>

    <link rel="stylesheet" href="app.css">
</head>

<body data-files="<?= htmlspecialchars(json_encode($files)) ?>">
    <div id="container"></div>

    <script src="app.js"></script>
</body>

</html>