// download.js — aynı klasörde index.html ile
document.getElementById('downloadBtn').addEventListener('click', function() {
    // Kaplumbağa oyunu Python kodu
    const pyCode = `import turtle
import math
import time

# --- Ekran ---
wn = turtle.Screen()
wn.setup(800, 600)
wn.title("Kaplumbağa Balon Savaşı")
wn.bgcolor("lightblue")
wn.tracer(0)

# --- Kaplumbağalar ---
t1 = turtle.Turtle(shape="turtle")
t2 = turtle.Turtle(shape="turtle")
for t in (t1, t2):
    t.penup()
    t.speed(0)

t1.color("blue")
t2.color("red")

# --- Dişler ---
tooth1 = turtle.Turtle(shape="triangle")
tooth2 = turtle.Turtle(shape="triangle")
for tooth in (tooth1, tooth2):
    tooth.penup()
    tooth.speed(0)
    tooth.shapesize(0.7, 1.4)
    tooth.color("white")

# --- Balonlar ---
b1 = turtle.Turtle(shape="circle")
b2 = turtle.Turtle(shape="circle")
for b in (b1, b2):
    b.penup()
    b.speed(0)
    b.shapesize(1.2)
b1.color("pink")
b2.color("orange")

# --- İpler ---
line1 = turtle.Turtle(); line2 = turtle.Turtle()
for l in (line1, line2):
    l.hideturtle(); l.penup(); l.pensize(2)

# --- Skor ---
score_t1 = 0
score_t2 = 0
score_writer = turtle.Turtle()
score_writer.hideturtle()
score_writer.penup()
score_writer.goto(0, 260)

winner_writer = turtle.Turtle()
winner_writer.hideturtle()
winner_writer.penup()

speed_step = 5
start_t1 = (-300, 200)
start_t2 = (300, -200)

game_over = False

# --- Tuş durumları ---
keys_t1 = {"up": False, "down": False, "left": False, "right": False}
keys_t2 = {"up": False, "down": False, "left": False, "right": False}

# --- Fonksiyonlar ---
def show_score():
    score_writer.clear()
    score_writer.write(f"T1: {score_t1}   T2: {score_t2}", align="center", font=("Arial", 18, "bold"))

def reset_positions():
    t1.goto(start_t1)
    t1.setheading(0)
    t2.goto(start_t2)
    t2.setheading(180)
    b1.goto(t1.xcor() - 40, t1.ycor())
    b2.goto(t2.xcor() - 40, t2.ycor())

def update_teeth_and_balloons():
    for t, tooth, b, line in [(t1, tooth1, b1, line1), (t2, tooth2, b2, line2)]:
        angle = math.radians(t.heading())
        tooth.goto(t.xcor() + 20*math.cos(angle), t.ycor() + 20*math.sin(angle))
        tooth.setheading(t.heading())
        b.goto(t.xcor() - 40*math.cos(angle), t.ycor() - 40*math.sin(angle))
        line.clear()
        line.goto(tooth.position())
        line.pendown()
        line.goto(b.position())
        line.penup()

def check_collision():
    global score_t1, score_t2, game_over
    if tooth1.distance(b2) < 20:
        score_t1 += 1
        reset_positions()
    if tooth2.distance(b1) < 20:
        score_t2 += 1
        reset_positions()
    show_score()
    if score_t1 >= 3:
        game_over = True
        winner_writer.goto(0,0)
        winner_writer.write("T1 kazandı! Devam için SPACE basın.", align="center", font=("Arial", 20, "bold"))
    if score_t2 >= 3:
        game_over = True
        winner_writer.goto(0,0)
        winner_writer.write("T2 kazandı! Devam için SPACE basın.", align="center", font=("Arial", 20, "bold"))

def restart_game():
    global score_t1, score_t2, game_over
    score_t1 = 0
    score_t2 = 0
    game_over = False
    winner_writer.clear()
    reset_positions()
    show_score()

# --- Tuş durum güncelleme ---
def key_press_t1_up(): keys_t1.update({"up": True})
def key_release_t1_up(): keys_t1.update({"up": False})
def key_press_t1_down(): keys_t1.update({"down": True})
def key_release_t1_down(): keys_t1.update({"down": False})
def key_press_t1_left(): keys_t1.update({"left": True})
def key_release_t1_left(): keys_t1.update({"left": False})
def key_press_t1_right(): keys_t1.update({"right": True})
def key_release_t1_right(): keys_t1.update({"right": False})

def key_press_t2_up(): keys_t2.update({"up": True})
def key_release_t2_up(): keys_t2.update({"up": False})
def key_press_t2_down(): keys_t2.update({"down": True})
def key_release_t2_down(): keys_t2.update({"down": False})
def key_press_t2_left(): keys_t2.update({"left": True})
def key_release_t2_left(): keys_t2.update({"left": False})
def key_press_t2_right(): keys_t2.update({"right": True})
def key_release_t2_right(): keys_t2.update({"right": False})

# --- Tuş atamaları ---
wn.listen()
# T1
wn.onkeypress(key_press_t1_up, "w"); wn.onkeyrelease(key_release_t1_up, "w")
wn.onkeypress(key_press_t1_down, "s"); wn.onkeyrelease(key_release_t1_down, "s")
wn.onkeypress(key_press_t1_left, "a"); wn.onkeyrelease(key_release_t1_left, "a")
wn.onkeypress(key_press_t1_right, "d"); wn.onkeyrelease(key_release_t1_right, "d")
# T2
wn.onkeypress(key_press_t2_up, "Up"); wn.onkeyrelease(key_release_t2_up, "Up")
wn.onkeypress(key_press_t2_down, "Down"); wn.onkeyrelease(key_release_t2_down, "Down")
wn.onkeypress(key_press_t2_left, "Left"); wn.onkeyrelease(key_release_t2_left, "Left")
wn.onkeypress(key_press_t2_right, "Right"); wn.onkeyrelease(key_release_t2_right, "Right")

wn.onkeypress(restart_game, "space")

# --- Başlangıç ---
reset_positions()
show_score()

# --- Oyun döngüsü ---
while True:
    if not game_over:
        # T1 hareket
        if keys_t1["up"]: t1.setheading(90); t1.forward(speed_step)
        if keys_t1["down"]: t1.setheading(270); t1.forward(speed_step)
        if keys_t1["left"]: t1.setheading(180); t1.forward(speed_step)
        if keys_t1["right"]: t1.setheading(0); t1.forward(speed_step)
        # T2 hareket
        if keys_t2["up"]: t2.setheading(90); t2.forward(speed_step)
        if keys_t2["down"]: t2.setheading(270); t2.forward(speed_step)
        if keys_t2["left"]: t2.setheading(180); t2.forward(speed_step)
        if keys_t2["right"]: t2.setheading(0); t2.forward(speed_step)
        # Diş ve balon güncelle
        update_teeth_and_balloons()
        check_collision()
    wn.update()
    time.sleep(0.02)

# --- CMD kapanmasın ---
input("Oyunu bitirdin, kapatmak için Enter'a bas...")`;

    // Blob oluştur ve indir
    const blob = new Blob([pyCode], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Kaplumbaga_Oyunu.py';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
});
