function lerp(start, end, amt) {
    return (1 - amt) * start + amt * end;
}
Number.prototype.clamp = function (min, max) {
    return Math.min(Math.max(this, min), max);
};
window.onload = function () {
    const housAmm = 20;
    const speed = 100;
    let houses = [];
    for (let i = 0; i < housAmm; i++) {
        let house = this.document.createElement("div");
        house.classList.add("house");
        house.id = "house" + i;
        house.style.height = "100%";
        house.style.width = this.window.innerWidth / housAmm - 10;
        // house.style.backgroundSize =  house.style.height + house.style.width ;
        houses.push(house);
        this.document.getElementById("houses").appendChild(house);
        house.addEventListener("click", (ev)=>{
            house.classList.add("onFire");
        });
    }

    const fireSetInterval = 500;
    setInterval(() => {
        houses[~~(this.Math.random() * houses.length)].classList.add("onFire");

    }, fireSetInterval);


    bucket.style.marginLeft = bucket.style.marginLeft || "1px";
    // bucket.style.backgroundSize = bucket.clientWidth + "px " + bucket.clientHeight + "px";

    const bucketCenter = bucket.clientWidth / 2;
    let lerpPos = 0;
    let lastPos = 0;

    let lastTimestep = 0;
    function animate(timestep){
        let deltaTime = timestep-lastTimestep;
        lastTimestep = timestep;
        var bodyRect = document.body.getBoundingClientRect();
        let bucketX = parseFloat(bucket.style.marginLeft);
        if (bucketX < this.document.getElementById("houses").clientWidth) {
            let onFirePositions = [];
            for (let i = 0; i < houses.length; i++) {
                if (houses[i].classList.contains("onFire")) {
                    let elemRect = houses[i].getBoundingClientRect();
                    let fireX = elemRect.left - bodyRect.left + houses[i].clientWidth / 2;
                    onFirePositions.push(fireX);
                }
            }

            let nP = coordPos(onFirePositions, bucketX);
            let endX = onFirePositions[nP];
            let startX = bucketX;

            if (lastPos == endX) {
                lerpPos += 1 / (Math.abs(endX - startX) / (speed*deltaTime/1000) );
            } else {
                lerpPos = 0;
                lastPos = endX;
            }

            let coord = lerp(startX + bucketCenter, endX, lerpPos.clamp(0, 1));
            bucket.style.marginLeft = coord - bucketCenter + "px";


            houses.find((v) => {
                let elemRect = v.getBoundingClientRect();
                let fireX = elemRect.left - bodyRect.left + v.clientWidth / 2;
                if (this.Math.round(fireX) == this.Math.round(coord)) {
                    v.classList.remove("onFire");
                }
            })
        }
        requestAnimationFrame(animate);
    }
    this.requestAnimationFrame(animate);

    function coordPos(posArr, bucketX) {
        let pos = 0;
        let last = Infinity;
        for (var i = 0; i < posArr.length; i++) {
            if (Math.abs(posArr[i] - bucketX) < last) {
                pos = i;
                last = Math.abs(posArr[i] - bucketX);
            }
        }
        return pos;
    }
}