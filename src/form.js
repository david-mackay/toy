import React from 'react';
import axios from 'axios';
import {useForm} from 'react-hook-form';
import placeholder from './placeholder.jpg';
let current_machine = null;


function Getdates(props){
    
    console.log('called', props)
    const info = document.getElementById('machineinfo')
    info.innerHTML = '';
    axios.post('http://localhost:5000/form', props)
    .then((response) => {
      console.log(response.data)
      current_machine = response.data
      for (let val in current_machine){
        if (val == "_id"){
            continue;
        }
        if(val == "name"){
            info.innerHTML += "<h1>"+ current_machine[val] + "</h1>";
            continue;
        }
        console.log(current_machine[val], typeof(current_machine[val]))
        info.innerHTML += "<div>"+ val + ": " + current_machine[val] + "</div>";
        // info.innerHTML += "<input type = 'checkbox' {...register(val)}>""</input>";
    };

    }, (error) => {
      console.log(error);
    });

}


  
class MForm extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            m: null,
        };
    }
    componentDidMount(props){
        console.log(this.props)
        axios.post('http://localhost:5000/form', this.props)
        .then((response) => {
          console.log(response.data)
            this.setState({m: response.data})
        }, (error) => {
          console.log(error);
        });
        }


    render(props) {
        {
            Getdates(this.props)
        }
        return <div>
            <p></p>
        </div>
    }
}

export default MForm