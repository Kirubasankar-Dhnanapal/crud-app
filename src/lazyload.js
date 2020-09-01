import React from "react";

class Lazyload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            resultList: '',
            page: 1,
            results: 20
        };

    }

    loadContacts = () => {
        const { resultList, page, results } = this.state;
        const url = `https://randomuser.me/api/?page=${this.state.page}&results=${this.state.results}`
        fetch(url).then((res) => res.json()).then((result) => this.setState({
            resultList: [...resultList,result.results],
            scrolling:false,
            totalPages : 20
        }))
    }

    componentWillMount() {
        this.loadContacts();
        this.scrollListner = window.addEventListener('scroll',()=>{
            this.handleScroll()
        })
    }

    handleScroll = () => {
        const {scrolling,totalPages,page} = this.state
        if(scrolling) return
        if(totalPages<=page) return
        const lastLi = document.querySelector('ul>li:last-child')
        const lastLiOffset = lastLi.offsetTop + lastLi.clientHeight
        const pageOffset = window.pageYOffset + window.innerHeight
        var bottomOffset = 20
        if(pageOffset>lastLiOffset-bottomOffset) this.loadmore()
    }

    loadmore = () => {
        this.setState(({
            page: this.state.page+1,
            scrolling :true,
        }), this.loadContacts);
    }

    render() {
        // if (this.state.loading) {
        //     return (
        //         <h5>Loading...</h5>
        //     )
        // }
        return (
            <div>
                <h1>Lazyload</h1>
                <ul>
                {this.state.resultList ?
                    this.state.resultList.flat().map((results) => <li>
                        <ContactList {...results} />
                    </li> ) : null
                }
                </ul>
            </div>
        )
    }

    
}

const ContactList = (props) => {
    return (
        <div>
            <div><label>Name :</label> {props.email}</div>
            <div><label>Gender :</label> {props.gender}</div>
            <div><label>Phone :</label> {props.phone}</div>
            <div><label>Latitude :</label> {props.location.coordinates.latitude}</div>
            <div><label>Longitude :</label> {props.location.coordinates.longitude}</div>
        </div>
    )

}

export default Lazyload;