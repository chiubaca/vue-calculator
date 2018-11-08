new Vue({
    el: "#vue-calculator",
    data: {
        display: "",
        calculation:{
            valueA:"",
            valueB:"",
            operator:""
        },
    },
    methods: {
       
        numberInput: function(number){
            //check if operator is empty, if so push into calculation.valueA
            if(this.calculation.operator.length === 0 ){
                this.display += number;
                this.calculation.valueA += number;            
            }else{
                this.display += number;
                this.calculation.valueB += number;  
            }
            //if operator is not an empty string, push append to valueB
            console.log("Value A", this.calculation.valueA)
            console.log("Value B", this.calculation.valueB)
        },
        setOperator:function(operator){
            this.display += operator;
            this.calculation.operator += operator; 
            console.log(this.calculation.operator) 
        },
        clearAll:function(){
            this.display = "";
            this.calculation.valueA = "";
            this.calculation.valueB = ""; 
            this.calculation.operator = "";
            console.log("calculation object reset", this.calculation );
            // console.log(this.calculation.valueA );
            // console.log(this.calculation.valueB);
            // console.log(this.calculation.operator); 
        },
        clearAndKeepValueA:function(){
            this.calculation.valueB = ""; 
            this.calculation.operator = "";
        },
        equate:function(){
            // console.log("hello from equate")
            // console.log(this.operator)
            switch(this.calculation.operator){
                case "+":
                    this.display =  Number(this.calculation.valueA) + Number(this.calculation.valueB);
                    this.calculation.valueA = this.display;
                    this.clearAndKeepValueA();
                    break;
                case "-":
                    this.display =  Number(this.calculation.valueA) - Number(this.calculation.valueB);
                    this.calculation.valueA = this.display;
                    this.clearAndKeepValueA();
                    break;
                case "/":
                    this.display =  Number(this.calculation.valueA) / Number(this.calculation.valueB);
                    this.calculation.valueA = this.display;
                    this.clearAndKeepValueA();
                    break;
                case "*":
                    this.display =  Number(this.calculation.valueA) * Number(this.calculation.valueB);
                    this.calculation.valueA = this.display;
                    this.clearAndKeepValueA();
                    break;
                
            }
        }

        
    },
    computed: {

    }
})