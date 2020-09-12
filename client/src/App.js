import React from 'react';
import './App.css';

// Material components
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

// Custom components
import AppBar from './components/AppBar';
import Lists from './components/List';
import Form from './components/Form';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      filter: '',
      progress: false,
      search: ""
    };
  }
  componentDidMount() {
    fetch(`${process.env.REACT_APP_SERVER_URL}/categories/all`)
      .then(res => res.json())
      .then(res => {
        let category = [...new Set(res.map(i => i.category_name))]
        this.setState({ data: res, category, progress: true });
      })
  }
  handleSearch = (itemsName) => {
    // To filter the searched result
    this.setState({ search: itemsName })

  }
  handleFilter(e) {
    let filter;
    if (e.target && e.target.value && e.target.value.length)
      filter = e.target.value;
    else
      filter = 'all';

    fetch(`${process.env.REACT_APP_SERVER_URL}/categories/${filter}`)
      .then(res => res.json())
      .then(res => {

        if (filter === 'all')
          this.setState({ data: res, filter: '' });
        else
          this.setState({ data: res, filter });
      })
  }
  render() {
    const mystyles = {
      filterDiv: {
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
      },
      typography1: {
        marginTop: 18,
        color: "grey",
      },

      outerDiv: {
        width: '100vw',
        display: 'flex',
        height: '100vh',
        flexDirection: 'column',
        justifyContent: 'center',
      },

      innerDiv: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
      },
      circularProgress: {
        color: '#00ccff',
        width: 60,
        height: 60,
      },
      typography2: {
        color: '#00ccff',
      }
    }
    return (
      this.state.progress ?
        <div>
          <AppBar search={this.handleSearch.bind(this)} />
          <Container maxWidth={'md'}>
            <div style={mystyles.filterDiv}>
              <Typography style={mystyles.typography1} variant={'h6'}>
                FilterBy:
                </Typography>
              <Form handleFilter={this.handleFilter.bind(this)} filter={this.state.filter} category={this.state.category} />
            </div>
            {
              this.state.data.filter(d => d.display_name.includes(this.state.search)).map((data, index) => {
                return <Lists key={index} data={data} />
              })
            }
          </Container >
        </div> :
        <div style={mystyles.outerDiv}>
          <div style={mystyles.innerDiv}>
            <div>
              <CircularProgress
                style={mystyles.circularProgress}
              />
              <Typography variant='h5' style={mystyles.typography2} gutterBottom>
                Cubyt
              </Typography>
            </div>
          </div>
        </div>
    );
  }
}

export default App;
