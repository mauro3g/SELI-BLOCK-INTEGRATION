import { Meteor } from 'meteor/meteor';
import '../imports/api/tutorFiles';
import '../imports/api/courseFiles';
import '../lib/TutorCollection';
import '../lib/CourseCollection';
import '../lib/ModalitiesCollection';
import '../lib/MethodologiesCollection';
import '../lib/CategoriesCollection';
import '../lib/RequirementsCollection';
import '../lib/PeopleCollection';
import '../lib/extract';
import '../lib/validateSignUp';
import '../lib/usersUtil';
import { Certificates } from '../lib/CertificatesCollection';

if (Meteor.isServer) {

  Meteor.startup(() => {

    options={
      url: "certificate-result",
      getArgsFromRequest: function (request) {
        var content = request.body;
        // Since form enconding doesn't distinguish numbers and strings, we need
        // to parse it manually
        //console.log(parseInt(content.certificateNumber,10));
        //console.log(content.certificateHash);
        return [ content.certificateNumber, content.certificateHash ];
      } 
    }
    
    SimpleRest.setMethodOptions('certificate-result', options);

    Meteor.methods({
      'certificate-result': function (certificateNumber,certificateHash) {

        console.log(certificateNumber);
        console.log(certificateHash);

        certificateInformation = {
          number : certificateNumber,
          hash : certificateHash
        }

        if(Certificates.insert(certificateInformation)){
          return "Certificado registrado";
        } else{
          return "Error de registro";
        }
    },
    });

  });
}
