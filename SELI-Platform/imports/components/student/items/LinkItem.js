import React from 'react';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';

export default class LinkItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }



  componentDidMount(){

  }

  render() {
    return(
      <div className="content-box">
        <div className="link-content-item">
          <div
            className="link-item-container-html"
            dangerouslySetInnerHTML={{__html: this.props.item.attributes.content}}
          >
          </div>
        </div>
      </div>
      );
    }
  }
