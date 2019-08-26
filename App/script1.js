var eventBus = new Vue ();

Vue.component("player", {
    props: {
        player: Number
    },
    template: `
        <div>
            <slot></slot>
            
        </div>

    `,
    data(){
        return {
            
        }
    }
})


Vue.component("name-form", {
    props: {
        status: Boolean,
    },
    template: `
        <div v-show="!submited" class="modal1">
            <div class="modal-form">
                <form @submit.prevent="handleSubmit">
                    <input placeholder="player one name" v-model="player1Name" type="text">
                    <input v-show="status" placeholder="player two name" v-model="player2Name" type="text">
                    <button type="submit">Submit</button>
                </form>
            </div>
            
        </div>

    `,
    data(){
        return {
            player1Name: '',
            player2Name: '',
            submited: false
        }
    },
    methods: {
        handleSubmit(){
            let playersName = {
                player1Name: this.player1Name,
                player2Name : this.player2Name
            } 
            eventBus.$emit('playersNameSubmitted', playersName)
            this.submited = true
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
        players: [ 
            {
                name: 'Player 1',
                Score: 0,
            
            }, 
            {
                name: 'Player 2',
                Score: 0,
            
            }     
        ],
        computer: {
            name: 'system',
            Score: 0,
        
            
        },
        gameType: {
            single: "single player",
            double: "two player"
        },

        player1Playing: false,
        player2Playing: false,
        systemPlaying: false,
        dice1: 0,
        dice2: 0,
        pladCount: 0,
        dice1Image: "https://via.placeholder.com/50x50",
        dice2Image: "https://via.placeholder.com/50x50",

    },
    methods: {
        handlePlayerChosen (type) {
            if(type === "single player"){
                this.singlePlayer = true
                this.gameTypeChosen = true
                this.chosen = true
            }else if(type === "two player"){
                this.twoPlayer = true
                this.gameTypeChosen = true
                this.chosen = true
            }
            
        },
        rollDice(curentPlayer){
            this.dice1 = Math.floor(Math.random() * 6) +1
            this.dice2 = Math.floor(Math.random() * 6) +1
            this.dice1Image = `./images/dice-${this.dice1}.png`
            this.dice2Image = `./images/dice-${this.dice2}.png`
            console.log(curentPlayer.currentPlayer.Score )
            curentPlayer.currentPlayer.Score += this.dice1 + this.dice2
            
        }, 
        restartGame(){
            this.dice1 = 0
            this.dice2 = 0
            this.player1Playing = true
            this.playersPlaying = false
            this.systemPlaying = false
            this.players[0].Score = 0
            this.players[1].Score = 0
            this.computer.Score = 0
            this.dice1Image = `https://via.placeholder.com/50x50`
            this.dice2Image = `https://via.placeholder.com/50x50`
            this.pladCount =  0
        },

        nextPlayer () {
            if(this.twoPlayer){
                if(this.player1Playing){  
                    this.player1Playing = false
                    this.player2Playing = true
                }else if(this.player2Playing){
                    this.player2Playing = false
                    this.player1Playing = true
                    this.pladCount ++
                }
            }else if(this.singlePlayer) {
                if(this.player1Playing){  
                    this.player1Playing = false
                    this.systemPlaying = true
                }
                else if(this.systemPlaying){ 
                    this.systemPlaying = false
                    this.player1Playing = true
                    this.pladCount ++
                }
            }
            
        },

        addScore () {
            let currentPlayer;
            if(this.player1Playing){
                currentPlayer = this.players[0]
            }else if(this.player2Playing){
                currentPlayer = this.players[1]
            }else if(this.systemPlaying){
                currentPlayer = this.computer
            }
            return {
                currentPlayer 
            }

        },

        playGame () {

            this.rollDice(this.addScore())
            this.nextPlayer()
            setTimeout( () => {
                if(this.systemPlaying && ! this.gameEnded){
                    this.rollDice(this.addScore())
                    this.nextPlayer()
                }
            }, 2000)

        },

    },
    computed: { 
        winner() {
            if(this.twoPlayer){
                if(this.pladCount === 3){
                    if( this.players[0].Score <= 24 && this.players[0].Score > this.players[1].Score){
                        return `${this.players[0].name} You Win`
                    }else if(this.players[1].Score <= 24 && this.players[1].Score > this.players[0].Score) {
                        return `${this.players[1].name} You Win`
                    }
                    else if(this.players[1].Score  === this.players[0].Score ){
                        return `Game Draw`
                    }
                }
                else if(this.players[0].Score === 24 && this.players[1].Score < 24){
                    return `${this.players[0].name} You Win`
                }
                else if(this.players[1].Score === 24 && this.players[0].Score < 24){
                    return `${this.players[0].name} You Win`
                }
                else if(this.players[1].Score > 24){
                    return `${this.players[0].name} You Win`
                }
                else if(this.players[0].Score > 24){
                    return `${this.players[1].name} You Win`
                }

            }       
            else if(this.singlePlayer){
                if(this.pladCount === 3){
                     if(this.players[0].Score <= 24 && this.players[0].Score > this.computer.Score ){
                        return `${this.players[0].name} You Win`
                    }else if(this.computer.Score <= 24 &&  this.computer.Score > this.players[0].Score ){
                        return `${this.computer.name} You Win`
                    }else if(this.computer.Score  === this.players[0].Score ){
                        return `Game Draw`
                    }else if(this.players[0].Score === 24 && this.computer.Score < 24){
                        return `${this.players[0].name} You Win`
                    }else if(this.computer.Score === 24 && this.players[0].Score < 24){
                        return `${this.computer.name} You Win`
                    }else if(this.computer.Score > 24){
                        return `${this.players[0].name} You Win`
                    }else if(this.players[0].Score > 24){
                        return `${this.computer.name} You Win`
                    }
                }
                else if(this.players[0].Score === 24 && this.computer.Score < 24){
                    return `${this.players[0].name} You Win`
                }
                else if(this.computer.Score === 24 && this.players[0].Score < 24){
                    return `${this.computer.name} You Win`
                }
                else if(this.computer.Score > 24){
                    return `${this.players[0].name} You Win`
                }
                else if(this.players[0].Score > 24){
                    return `${this.computer.name} You Win`
                }
                
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
        eventBus.$on('playersNameSubmitted', playersName => {
            this.players[0].name = playersName.player1Name
            this.players[1].name = playersName.player2Name
        })
    }
        
});

