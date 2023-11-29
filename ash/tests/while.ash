a = 10
while a > 0 do
    a -= 1
    if a == 6 then
        log("Jumping 6")
        next
    end
    if a == 2 then
        log("Break at 2")
        break
    end
    log(a)
loop
