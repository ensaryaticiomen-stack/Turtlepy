document.getElementById('downloadBtn').addEventListener('click', function() {
    // Python oyununun içeriği
    const pyCode = `
import turtle

# Turtle oyunu kodunu buraya yapıştır
t1 = turtle.Turtle()
t1.forward(100)
turtle.done()
`;

    // Blob ile indirme
    const blob = new Blob([pyCode], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'KaplumbagaOyunu.py'; // indirilen dosya adı
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
});
