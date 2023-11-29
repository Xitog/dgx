import io > writeln, read

secret = Random.int(1, 100)

writeln(But du jeu : devinez un nombre entre 1 et 100.)

a = 0
essai = 0

while a != secret do
    writeln("Entrez un nombre entre 1 et 100 :")
    guess = read.to_i
    essai += 1
    if a != secret then
        writeln("Raté !")
    end
loop

writeln("Trouvé en ${essai} essais.")
