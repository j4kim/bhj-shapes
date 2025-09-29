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

    <script src="https://unpkg.com/konva@10/konva.min.js"></script>
</head>

<body>
    <pre><?php var_dump($files) ?></pre>
    <div id="container"></div>

    <script>
        var stage = new Konva.Stage({
            container: 'container',
            width: 500,
            height: 500,
        });

        var layer = new Konva.Layer();

        var circle = new Konva.Circle({
            x: stage.width() / 2,
            y: stage.height() / 2,
            radius: 70,
            fill: 'red',
            stroke: 'black',
            strokeWidth: 4,
        });

        layer.add(circle);

        stage.add(layer);
    </script>
</body>

</html>