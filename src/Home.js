import React, { Component } from 'react';
import './App.css';
import Plot from 'react-plotly.js';
import axios from "axios";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageSize: 30,
      fromDateDisplay: null,
      toDateToDisplay: null,
      fromDate: '',
      toDate: '',
      page: 1,
      order: 'desc',
      sort: 'popular',
      sortList: ['popular', 'activity', 'name'],
      languages: [],
      count: [],
    }
  }
  componentDidMount() {
    const { pageSize, fromDate, toDate, page, sort, order } = this.state;
    console.log('date', fromDate, toDate);
    this.populateData();
  }
  populateData = () => {
    const { pageSize, fromDate, toDate, page, sort, order } = this.state;
    //console.log(this.state);
    const url = `https://api.stackexchange.com/2.2/tags?page=${page}&pagesize=${pageSize}&fromdate=${fromDate}&todate=${toDate}&order=${order}&sort=${sort}&site=stackoverflow`;

    axios.get(url)
      .then((response) => {
        // handle success
        let items = response.data.items;
        let lang = items.map((key) => key.name);
        let langCount = items.map((key) => key.count);
        this.setState({
          languages: lang,
          count: langCount
        });
        console.log('api calling', response.data.items, lang, langCount);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });

  }

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  submitFilter = () => {
    console.log('submit', this.state);
    this.populateData();
  }

  handleFromDate = (event) => {
    let fDate = event.target.value;
    console.log('fdate', fDate);
    this.setState({
      fromDateDisplay: fDate,
      fromDate: Math.floor(new Date(fDate).getTime() / 1000.0)
    })
    //this.setState({ fromDate:  Math.floor(new Date(fDate).getTime()/1000.0)});
  }

  handleToDate = (event) => {
    let tDate = event.target.value;
    console.log('tdate', tDate);
    this.setState({
      toDateToDisplay: tDate,
      toDate: Math.floor(new Date(tDate).getTime() / 1000.0)
    })
    //this.setState({ toDate:  Math.floor(new Date(tDate).getTime()/1000.0)});
  }

  formatDate = (date) => {
    var d = new Date(date);
    console.log('format', d);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    let year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }

  render() {
    const { page, pageSize, toDate, fromDate, sort, order, count = [], sortList, fromDateDisplay, toDateToDisplay, languages = [] } = this.state;
    let currDate = Date.now();
    currDate = new Date(currDate);
    let dateFormatted = this.formatDate(new Date(currDate).getTime());
    console.log('after update', this.state);
    return (
      <div className="App">
        {/* <PageHeader /> */}
        <div className='filter'>
          <Row style={{margin: '0px'}}>
            <Col lg={4} md={6} xs={8}>
              <div className='row1'>
                <span>Pagesize: </span>
                <input className='input-box' type='number' onChange={this.handleInputChange}
                  name='pageSize' value={pageSize} />
              </div>
            </Col>
            <Col lg={4} md={6} xs={8}>
              <div className='row1'>
                <span>Page: </span>
                <input className='input-box' type='number' onChange={this.handleInputChange}
                  name='page' value={page} />
              </div>
            </Col>
            <Col lg={4} md={6} xs={8}>
              <div className='row1'>
                <span>fromdate: </span>
                <input className='input-box' type='date' max={dateFormatted} onChange={this.handleFromDate}
                  name='fromDate' value={fromDateDisplay} />
              </div>
            </Col>
          </Row>
          <Row style={{margin: '0px'}}>
            <Col lg={4} md={6} xs={8}>
              <div className='row2'>
                <span>todate: </span>
                <input className='input-box' type='date' onChange={this.handleToDate}
                  name='toDate' value={toDateToDisplay} />
              </div>
            </Col>
            <Col lg={4} md={6} xs={8}>
              <div className='row2'>
                <span>Order: </span>
                <select value={order} onChange={this.handleInputChange}>
                  <option name='desc' value="desc">desc</option>
                  <option name='asc' value="asc">asc</option>
                </select>
              </div>
            </Col>
            <Col lg={4} md={6} xs={8}>
              <div className='row2'>
                <span>Sort: </span>
                <select value={sort} onChange={this.handleInputChange}>
                  {sortList.map((key) => (
                    <option name='key' value={key}>{key}</option>
                  )
                  )}
                </select>
              </div>
            </Col>
          </Row>
        </div>
        <div className='button'>
          <button className='click' onClick={this.submitFilter}>RUN</button>
        </div>
          <Plot
            data={[
              {
                x: languages,
                y: count,
                type: 'bar'
              }
            ]}
            layout={{ width: 300, height: 300 }}
          />
      </div>
    );
  }
}
export default Home;