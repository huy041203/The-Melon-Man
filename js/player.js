    game.player = {
            x: 54,
            y: 0,
            height: 24,
            highestY: 0,
            direction: "left",
            isInAir: false,
            startedJump: false,
            moveInterval: null,
        doubleJumpUsed: false,
        fallTimeoutID: null, // Biến để lưu ID của timeout
            fallTimeout: function(startingY, time, maxHeight) {
            if (this.fallTimeoutID) {
                clearTimeout(this.fallTimeoutID);
            }

            this.fallTimeoutID = setTimeout(() => {
                    if (this.isInAir) {
                        this.y = startingY - maxHeight + Math.pow((-time / 3 + 11), 2)
                        if (this.y < this.highestY) {
                            this.highestY = this.y
                        }
                        if (time > 37) {
                            this.startedJump = false
                            game.checkCollisions()
                        }
                        if (time < 150) {
                            time++
                            this.fallTimeout(startingY, time, maxHeight)
                        } else {
                            game.isOver = true
                        }
                        if (this.y > 40) {
                            game.isOver = true
                        }
                        game.requestRedraw()
                    }
                }, 12)
            },
            animationFrameNumber: 0,
            collidesWithGround: true,
            animations: {
                // Describe coordinates of consecutive animation frames of objects in textures
                left: [{tileColumn: 0, tileRow: 7}, {tileColumn: 1, tileRow: 7}, {tileColumn: 2, tileRow: 7}, {tileColumn: 3, tileRow: 7}, {tileColumn: 4, tileRow: 7}],
                right: [{tileColumn: 0, tileRow: 6}, {tileColumn: 1, tileRow: 6}, {tileColumn: 2, tileRow: 6}, {tileColumn: 3, tileRow: 6},, {tileColumn: 4, tileRow: 6}]
            },
        jump: function(type) {
                if (!this.isInAir) {
                clearTimeout(this.fallTimeoutID);
                game.sounds.jump.play();
                this.isInAir = true;
                this.startedJump = true;
                this.doubleJumpUsed = false; // Reset trạng thái double jump
                var startingY = this.y;
                var time = 1;
                var maxHeight = 121;

                if (type === "fall") {
                    time = 30;
                    maxHeight = 0;
                    }

                this.fallTimeout(startingY, time, maxHeight);
            } else if (!this.doubleJumpUsed) {
                game.sounds.jump.play();
                this.doubleJumpUsed = true;
                var startingY = this.y;
                var time = 1;
                var maxHeight = 90;

                this.fallTimeout(startingY, time, maxHeight);
                }
            }
        }
