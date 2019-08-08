Vue.component("player-one", {
    props: {
        score: Number,
    },
    template: `
        <div class="card player">
            <div class="name">
                <p>player 1<span>.</span></p>
            </div> 
            <div class="ScoreBox">
                <p> Score:<span>{{score}}</span></p>
            </div>
            <div class="actioBtn">
                <button  type="submit"> Playing</button>
            </div>
        </div>

    `,
    data(){
        return {
            playerName: '',
        }
    }

})

Vue.component("player-two", {
    props: {
        score: Number,
    },
    template: `
        <div class="card computer">
            <div class="name">
                <p>player 2<span >.</span></p>
            </div> 
            <div class="ScoreBox">
                <p> Score: <span>{{score}}</span></p>
            </div>
            <div class="actioBtn">
                <button type="submit"> Playing</button>
            </div>
        </div>

    `,
    data(){
        return {
            playerName: ''
        }
    }
})

Vue.component("system", {
    props: {
        score: Number,
    },
    template: `
        <div class="card computer">
            <div class="name">
                <p> Sysem <span>.</span></p>
            </div> 
            <div class="ScoreBox">
                <p> Score: <span>{{score}}</span></p>
            </div>
            <div class="actioBtn">
                <input type="button" v-on:change="method" v-model="alert">
            </div>
        </div>

    `,
    props: {
        score: Number,
        alert: String,
        method: { type: Function },
    },
    data (){
        return {
        }
    }
})

var app = new Vue ({
    el: "#app",

    data: {
        singlePlayer: false,
        twoPlayer: false,
        gameTypeChosen: false,
        chosen: false,
        alert: "",
        players: [ 
            {
                playerOne: 'Player 1',
                Score: 0,
                playerOnePladCount: 0
            }, 
            {
                playerTwo: 'Player 2',
                Score: 0,
                playerTwoPladCount: 0
            }     
        ],
        computer: {
            name: 'system',
            Score: 0,
            systemPladCount: 0
            
        },
        pladCount: 0,
        player1Playing: false,
        player2Playing: false,
        systemPlaying: false,
        dice1: 0,
        dice2: 0,
        dice1Image: "https://via.placeholder.com/50x50",
        dice2Image: "https://via.placeholder.com/50x50",

    },
    methods: {
        handleSinglePlayerChosen () {
            this.singlePlayer = true
            this.gameTypeChosen = true
            this.chosen = true
        },
        handleTwoPlayerChosen () {
            this.twoPlayer = true
            this.gameTypeChosen = true
        },
        rollDice(curentPlayer){
            this.dice1 = Math.floor(Math.random() * 6) +1
            this.dice2 = Math.floor(Math.random() * 6) +1
            this.dice1Image = `./images/dice-${this.dice1}.png`
            this.dice2Image = `./images/dice-${this.dice2}.png`
            
            curentPlayer.Score += this.dice1 + this.dice2
            
        }, 
        playGame () {
            if(this.twoPlayer){
                if(this.player1Playing){
                    this.rollDice(this.players[0])

                    this.player1Playing = false
                    this.player2Playing = true

                }else if(this.player2Playing){
                    this.rollDice(this.players[1])
                    this.player2Playing = false
                    this.player1Playing = true
                    this.pladCount ++
                }
            }else if(this.singlePlayer){
                if(this.player1Playing){
                    this.rollDice(this.players[0])

                    this.player1Playing = false
                    this.systemPlaying = true
                    this.alert = "playing"
                    
                }else if(this.systemPlaying){
                    console.log('it runs')
                    this.rollDice(this.computer)

                    this.player2Playing = false
                    this.player1Playing = true
                    this.pladCount ++
                }
            }

        },

    },
    computed: {
        
        winner() {
            if(this.twoPlayer){
                if(this.pladCount === 3){
                    if( this.players[0].Score <= 24 && this.players[0].Score > this.players[1].Score){
                        return `${this.players[0].playerOne} You Win`
                    }else if(this.players[1].Score <= 24 && this.players[1].Score > this.players[0].Score) {
                        return `${this.players[1].playerTwo} You Win`
                    }
                    else if(this.players[1].Score > 0 === this.players[0].Score > 0){
                        return `Game Draw`
                    }
                }
                else if(this.players[0].Score === 24 && this.players[1].Score < 24){
                    return `${this.players[0].playerOne} You Win`
                }
                else if(this.players[1].Score === 24 && this.players[0].Score < 24){
                    return `${this.players[0].playerTwo} You Win`
                }
                else if(this.players[1].Score > 24){
                    return `${this.players[0].playerOne} You Win`
                }
                else if(this.players[0].Score > 24){
                    return `${this.players[1].playerTwo} You Win`
                }
                // else if(this.players[1].Score > 0 === this.players[0].Score > 0 ){
                //     return `Game Draw`
                // }
            }       
            else if(this.singlePlayer){
                if(this.pladCount === 3){
                     if(this.players[0].Score <= 24 && this.players[0].Score > this.computer.Score ){
                        return `${this.players[0].playerOne} You Win`
                    }else if(this.computer.Score <= 24 &&  this.computer.Score > this.players[0].Score ){
                        return `${this.computer.name} You Win`
                    }else if(this.computer.Score > 0 === this.players[0].Score > 0){
                        return `Game Draw`
                    }
                }
                else if(this.players[0].Score === 24 && this.computer.Score < 24){
                    return `${this.players[0].playerOne} You Win`
                }
                else if(this.computer.Score === 24 && this.players[0].Score < 24){
                    return `${this.computer.name} You Win`
                }
                else if(this.computer.Score > 24){
                    return `${this.players[0].playerOne} You Win`
                }
                else if(this.players[0].Score > 24){
                    return `${this.computer.name} You Win`
                }
                // else if(this.computer.Score > 0 === this.players[0].Score > 0){
                //     return `Game Draw`
                // }
                
            }
        },
        gameEnded(){
            //game ended for two player
            if(this.twoPlayer){
                if(this.pladCount === 3){
                    if( this.players[0].Score <= 24 && this.players[0].Score > this.players[1].Score){
                        return true
                    }else if(this.players[1].Score <= 24 && this.players[1].Score > this.players[0].Score) {
                        return true
                    }else if(this.players[1].Score > 0 === this.players[0].Score > 0){
                        return true
                    }
                }
                else if(this.players[0].Score === 24 && this.players[1].Score < 24){
                    return true
                }
                else if(this.players[1].Score === 24 && this.players[0].Score < 24){
                    return true
                }
                else if(this.players[1].Score > 24){
                    return true
                }
                else if(this.players[0].Score > 24){
                    return true
                }
                // else if(this.players[1].Score > 0 === this.players[0].Score > 0){
                //     return true
                // }
            }    
            //game ended for single player   
            else if(this.singlePlayer){
                if(this.pladCount === 3){
                     if(this.players[0].Score <= 24 && this.players[0].Score > this.computer.Score ){
                        return true
                    }else if(this.computer.Score <= 24 &&  this.computer.Score > this.players[0].Score ){
                        return true
                    }else if(this.computer.Score > 0 === this.players[0].Score > 0){
                        return true
                    }
                }
                else if(this.players[0].Score === 24 && this.computer.Score < 24){
                    return true
                }
                else if(this.computer.Score === 24 && this.players[0].Score < 24){
                    return true
                }
                else if(this.computer.Score > 24){
                    return true
                }
                else if(this.players[0].Score > 24){
                    return true
                }
                // else if(this.computer.Score > 0  === this.players[0].Score > 0 ){
                //     return true
                // }
                
            }

        }
    },
    mounted() {
        this.player1Playing = true
    }
        
});

