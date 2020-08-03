import React from 'react'
import Tags from './Tags'
import ImageView from './ImageView'

import '../Text2Doc.css'

class Text2Doc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
  }

  componentDidMount = () => {
    this.readTextFile(this.props.filename);
  }

  componentDidUpdate = (prevProps) => {

    if (this.props.filename !== prevProps.filename) {
      this.readTextFile(this.props.filename);
    }
  }

  readTextFile = file => {
    console.log("readTextFile: " + file)
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = () => {
      if (rawFile.readyState === 4) {
        if (rawFile.status === 200 || rawFile.status === 0) {
          var allText = rawFile.responseText;
  
          this.setState({
            text: allText
          });
        }
      }
    };
    
    rawFile.send(null);
  };

  getPrefix = (row) => {

    const pos = row.indexOf(":");
    var prefix = "NF";

    if (pos > 0) {
      prefix = row.slice(0, pos);
    }

    // console.log(prefix);
    return prefix;
  }

  getText = (row) => {
    const pos = row.indexOf(":");
    var text = row;
    if (pos > 0) {
      text = row.slice(pos + 1);
    }
    return text;
  }

  getLinkName = (row) => {
    const pos = row.indexOf("]");
    var text = row;
    if (pos > 0) {
      text = row.slice(1, pos);
    }
    return text;
  }

  getLink = (row) => {
    const pos = row.indexOf("]");
    var text = row;
    if (pos > 0) {
      text = row.slice(pos + 2); // take into account the (
      text = text.slice(0, text.length - 1);
    }
    return text;
  }

  renderText = (key, prefix, text) => {
    // console.log("renderText:" + prefix);

    switch (prefix.toUpperCase()) {
      case 'B': // Blank Row
        return (<div>{'\u00A0'}</div>)
      case 'NF':
        return (<div key={key}>{text}</div>)
      case 'H1':
        return (<h1 key={key}>{text}</h1>)
      case 'H2':
        return (<h2 key={key}>{text}</h2>)
      case 'H2U':
        return (<h2 className="underline" key={key}>{text}</h2>)
      case 'H3':
        return (<h3 key={key}>{text}</h3>)
      case 'H3U':
        return (<h3 className="underline" key={key}>{text}</h3>)
      case 'H4':
        return (<h4 key={key}>{text}</h4>)
      case 'H4U':
        return (<h4 className="underline" key={key}>{text}</h4>)
      case 'HL':
        return (<div className="horizontal-line"></div>)
      case 'P':
        return (<p key={key}>{text}</p>)
      case 'C':
        return (<span className="code" key={key}>{text}</span>)
      case 'I':
      case 'I1':

        const filename = text.trim();
        const src = `${process.env.PUBLIC_URL}/img/${filename}`;
        return (<div className="row center">
          <ImageView css={"image001 shadow"} src={src} />
        </div>)
      case 'I2':

        var src2 = "";

        const images = text.split(",");

        const result = images.map(image => {
          const filename = image.trim();
          src2 = `${process.env.PUBLIC_URL}/img/${filename}`;
          return(<ImageView css={"image002 shadow"} src={src2} />);
        })
        return (<div className="row center">{result}</div>)

      case 'I3':

        var src3 = "";

        const images3 = text.split(",");

        const result3 = images3.map(image => {
          const filename = image.trim();
          src3 = `${process.env.PUBLIC_URL}/img/${filename}`;
          return(<ImageView css={"image003 shadow"} src={src3} />);
        })
        return (<div className="row center">{result3}</div>)
        case 'I4':

          var src4 = "";
  
          const images4 = text.split(",");
  
          const result4 = images4.map(image => {
            const filename = image.trim();
            src3 = `${process.env.PUBLIC_URL}/img/${filename}`;
            return(<ImageView css={"image004 shadow"} src={src4} />);
          })
          return (<div className="row center">{result4}</div>)
  
      case 'L':
        const name = this.getLinkName(text);
        const link = this.getLink(text);
        return (<a className="normal-a" rel="noopener noreferrer" target='_blank' href={link}>{name}</a>)
      case 'T':
        return (<Tags tagList={text} />);
      case '*':
        return <span className='bullet'>{text}<br /></span>
      default:
        return <span key={key}>{text}<br /></span>
    }
  }

  render() {
    //console.log("ArticleReader - render" + this.state.filename);
    var prefix = "";
    var text = "";

    return (
      <div className="article">
        {this.state.text.split("\n").map((item, key) => {

          prefix = this.getPrefix(item);
          text = this.getText(item);

          return (
            <div key={key}>{this.renderText(key, prefix, text)}</div>
          )
        })}
      </div>
    )
  }

}

export default Text2Doc;


