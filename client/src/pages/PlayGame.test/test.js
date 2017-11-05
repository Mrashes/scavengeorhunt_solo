compareLocations = () => {
    //alias creation
    const destLat = 42.056
    const destLon = -88.0143

    const lonHigh = Math.round(10000*(destLon+.0003))/10000
    // console.log(latHigh)
    // const latLow = Math.round(10000*lat)/10000

    //makes a range of numbers for the reference
    const latTruth = destLat-.0003<=42.0561<=destLat+.0003
    const lonTruth = destLon-.0003>=-88.0143>=lonHigh
    console.log(destLon-.0003)
    console.log(destLon+.0003)
    console.log(latTruth, lonTruth)

    //if location comparison correct then display the aframe environment
    if (latTruth && lonTruth) {
        console.log('Both True')
        // //This vibrates indicating you got location
        // window.navigator.vibrate(200);

        // //direct to aframe
        // this.setState({
        //     turn: this.state.turn+1,
        //     redirect: true
        // })
    }
    else {
        console.log('something false')
        //Keep going
    }
}


tryCatch = () => {
    try {
        throw 'myException'; // generates an exception
    }
    catch (e) {
        // statements to handle any exceptions
        console.log(e)
    }
    console.log('made it pass try catch')
}

tryCatch()