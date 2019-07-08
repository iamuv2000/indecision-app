class IndecisionApp extends React.Component{
    constructor(props){
        super(props)
        this.handleDeleteOptions=this.handleDeleteOptions.bind(this)
        this.handlePick=this.handlePick.bind(this)
        this.handleAddOption=this.handleAddOption.bind(this)
        this.handleDeleteOption=this.handleDeleteOption.bind(this)
        this.state={
            options: []
        }
    }
    componentDidMount(){
        try{
            const json = localStorage.getItem('options')
            const options = JSON.parse(json)
            if(options){
                this.setState(()=>({options}))
            }
        }catch(e){
            //Do nothing!
        }
        
        
        //console.log('fetching data')
    }
    componentDidUpdate(prevProps, prevState){
        if(prevState.options.length!==this.state.options.length){
            const json = JSON.stringify(this.state.options)
            localStorage.setItem('options',json)
            //console.log('Saving data')
        }
        
    }
    componentWillUnmount(){
        console.log('Component will unmount!')
    }
    handleDeleteOptions(){ 
        this.setState(()=>({options:[]}));      
    }

    handleAddOption(option){
        if(!option){
            //runs if there is empty string
            return 'Enter valid value to add option'
        }else if(this.state.options.indexOf(option)>-1){
            //if the option already exist(-1 is returned is option is not in array)
            return 'This option already exists!'
        }
        this.setState((prevState)=>({ options: prevState.options.concat([option])}))
    }
    handleDeleteOption(optionToRemove){
        this.setState((prevState)=>({options: prevState.options.filter((option)=>{
                return option!==optionToRemove;
            })
        }))
    }
    handlePick(){
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNum];
        alert(option)
    }
    
    render(){
        const subTitle = "Put your life at the hands of a computer";
        return (
            <div>
                <Header subTitle={subTitle}/>
                <Action 
                hasOptions={this.state.options.length>0?true:false}
                handlePick = {this.handlePick}
                />
                <Options 
                options = {this.state.options}
                handleDeleteOptions={this.handleDeleteOptions}
                handleDeleteOption={this.handleDeleteOption}
                />
                <AddOption handleAddOption={this.handleAddOption}/>
            </div>
        );
    }
}

IndecisionApp.defaultProps = {
    options: []

}

const Header = (props) =>{
    return (
        <div>
            <h1>{props.title}</h1>
            {props.subTitle && <h2>{props.subTitle}</h2>}
        </div>
    );
}

Header.defaultProps = {
    title: 'Indecision'
}

const Action = (props) =>{
    return(
        <div>
            <button 
            disabled = {!props.hasOptions} 
            onClick={props.handlePick}
            >
            What should I do?</button>
        </div>
        );
}

const Options = (props) => {
    return(
        <div>
            <button onClick={props.handleDeleteOptions}>Remove All</button>
            {props.options.length===0&& <p>Please Add an option to get started!</p>}
            {
                props.options.map((option)=>{
                    return <Option 
                            key={option} 
                            optionText={option}
                            handleDeleteOption={props.handleDeleteOption}/>
                })
            }
        </div>
    );
}

const Option = (props) =>{
    return(
        <div>
            {props.optionText}
            <button 
                onClick={(e)=>{
                    props.handleDeleteOption(props.optionText)
            }}
            >
                Remove
            </button>
        </div>
    );
}

class AddOption extends React.Component{
    constructor(props){
        super(props)
        this.handleAddOption=this.handleAddOption.bind(this);
        this.state ={
            error: undefined
        }
    }
    handleAddOption(e){
        e.preventDefault();
        const option = e.target.elements.option.value.trim();
        const error = this.props.handleAddOption(option)
        this.setState(()=>({error}))
        if(!error){
            e.target.elements.option.value=''
        }
        
    }
    
    render(){
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
               <form onSubmit={this.handleAddOption}>
                <input type="text" placeholder="Add Option" name="option" autoComplete="off"/>
                <button>Add Option</button>
               </form>
            </div>
        );
    }
}


ReactDOM.render(<IndecisionApp />, document.getElementById('app'))