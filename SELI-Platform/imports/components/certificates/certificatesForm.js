import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import ImageUpload from '../files/ImageUpload';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import { Tutors } from '../../../lib/TutorCollection';
import TutorFilesCollection from '../../../lib/TutorFilesCollection';

export default class TutorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      imageId: '',
      parentId: 'creating-tutor',
    }
  }

  handleChange = event => {
    this.setState({ category: event.target.value });
  };

  validateEmptyInputs(inputs){
    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i] === "") {
        this.props.showControlMessage('Fields marked with * are required');
        this.showEmptyInputs();
        return false;
      }
    }
    if(this.state.url === ""){
      this.props.showControlMessage('You have to upload your profile photo');
      return false;
    }
    return true;
  }

  getData(){
    let idStudent = Math.floor(Math.random()*(200-100))+100;
    let student = document.getElementById('student-input').value;
    let tutor = document.getElementById('tutor-input').value;
    let date = document.getElementById('date-input').value;
    let course = document.getElementById('course-input').value;
    let description = document.getElementById('course-description-input').value;
    let duration = document.getElementById('duration-input').value;
    let certificateNumber = Math.floor(Math.random()*(1000-500))+500;
    let certificateInfo = {
        idStudent: idStudent,
        student: student,
        tutor: tutor,
        date: date,
        course: course,
        description: description,
        duration: duration,
        certificateNumber: certificateNumber,
    };
    //console.log(idStudent, certificateNumber);
    this.sendCertificate(certificateInfo);
  }

  sendCertificate(certificateInfo){
    /*const certificateRest = async () => {
        const response = await fetch('https://seli-blockchain-int-test.herokuapp.com/certificate-result', {
          method: 'POST',
          body: {certificateNumber:2024,certificateHash:"asdas123"}, // string or object
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const myJson = await response.json(); //extract JSON from the http response
        // do something with myJson
        console.log(myJson);
      }*/

   /* const certificateRest = async () => {
        const response = await fetch('http://www.seliblockcert.tk/datos', {
          method: 'POST',
          body: certificateInfo, // string or object
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const myJson = await response.json(); //extract JSON from the http response
        // do something with myJson
        console.log(myJson);
      }
*/
   /* fetch('http://localhost:3000/certificate-result', {
      mode:'no-cors',
      method: "POST",
      body: {
        certificateNumber:2023,
        certificateHash:'asdas123',
      },
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        //'Access-Control-Allow-Origin': '*'
      }
    }).then(function(res){ console.log(res) })
    .catch(function(res){ console.log(res) });
    */

   /*$.ajax({
    mode:'no-cors',
    method: "post",
    url: "http://www.seliblockcert.tk/datos",
    data: JSON.stringify(certificateInfo),
    contentType: "application/json",
    success: function (data) {
      console.log(data); // 6
    }
  });*/

  fetch('http://www.seliblockcert.tk/datos', {
  method: 'post',
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(certificateInfo)
}).then(res=>res.json())
  .then(res => console.log(res));

  }


  getImageInformation(url, id){
    this.setState({
      url: url,
      imageId: id,
    });
  }

  componentWillUnmount(){
    let files = TutorFilesCollection.find({ meta: {parentId: "creating-tutor"} }, { sort: { name: 1 } }).fetch();
    for (var i = 0; i < files.length; i++) {
      Meteor.call('RemoveTutorFile', files[i]._id, function (err) {
        if (err)
        console.log(err);
      });
    }
  }

  componentDidMount(){
    if(this.props.tutorToEdit !== undefined){
      this.setState({
        url: this.props.tutorToEdit.imageUrl,
        imageId: this.props.tutorToEdit.imageId,
        parentId: this.props.tutorToEdit._id,
      });
    }
  }

  removeUrl(){
    this.setState({
      url: '',
      imageId: '',
    });
  }

  resetFile(){
    this.setState({
      parentId: 'creating-tutor',
    });
  }

  render() {
    return(
      <div>
        <div className="form-container">
          <div className="form-title">
            Certificate Management
          </div>
          <div className="form-subtitle">Certificate information</div>
          <Divider/>
          <div className="form-separator"></div>

          <div className="input-container">
            <TextField
              id="student-input"
              label="Student name"
              margin="normal"
              variant="outlined"
              fullWidth
              required
              error={this.state.nameError}
            />
          </div>
          <div className="input-container">
            <TextField
              id="tutor-input"
              label="Tutor"
              margin="normal"
              variant="outlined"
              fullWidth
              required
              error={this.state.nameError}
            />
          </div>
          <div className="input-container">
            <TextField
              id="date-input"
              label="Course date"
              margin="normal"
              variant="outlined"
              fullWidth
              required
              error={this.state.nameError}
            />
          </div>
          <div className="input-container">
            <TextField
              id="course-input"
              label="Course title"
              margin="normal"
              variant="outlined"
              fullWidth
              required
              error={this.state.nameError}
            />
          </div>
          <div className="input-container">
            <TextField
              id="course-description-input"
              label="CDescription"
              margin="normal"
              variant="outlined"
              fullWidth
              required
              multiline
              rows="3"
              error={this.state.biographyError}
            />
          </div>
          <div className="input-container">
            <TextField
              id="duration-input"
              label="Duration"
              margin="normal"
              variant="outlined"
              fullWidth
              required
              error={this.state.nameError}
            />
          </div>

          
          {
            <div className="form-button-container">
              <Button onClick={() => this.getData()} className="form-button" id="upload-button" variant="contained" color="secondary">
                Send certificate
              </Button>
            </div>
          }
        </div>
      </div>
    );
  }
}
