const rawHtml = `
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Document</title>
    <link rel="stylesheet" href="http://www.baidu.com/demo.css">
    <link rel="stylesheet" href="/demo.css">
    <link rel="stylesheet" href="./demo.css">
    <link rel="stylesheet" href="demo.css">
</head>
<body>
    <script src="http://www.baidu.com/demo.js"></script>
    <script src="/demo.js"></script>
    <script src="./demo.js"></script>
    <script src="demo.js"></script>
</body>
</html>
`

export { rawHtml }
