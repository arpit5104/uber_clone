import React, { Component } from 'react'
import { LoadScript, GoogleMap } from '@react-google-maps/api'

const containerStyle = {
    width: '100%',
    height: '100%',
};

class LiveTracking extends Component {
    // Define libraries as a static class property
    static libraries = ['marker', 'places'];

    state = {
        currentPosition: {
            lat: -34.397,
            lng: 150.644
        },
        map: null,
        marker: null
    };

    handlePositionUpdate = (position) => {
        const { latitude, longitude } = position.coords;
        this.setState({
            currentPosition: {
                lat: latitude,
                lng: longitude
            }
        });
    };

    handleError = (error) => {
        console.error("Error getting location:", error);
    };

    componentDidMount() {
        // Get initial position with high accuracy
        navigator.geolocation.getCurrentPosition(
            this.handlePositionUpdate,
            this.handleError,
            { enableHighAccuracy: true }
        );

        // Watch position with high accuracy
        this.watchId = navigator.geolocation.watchPosition(
            this.handlePositionUpdate,
            this.handleError,
            { enableHighAccuracy: true }
        );
    }

    componentWillUnmount() {
        if (this.watchId) {
            navigator.geolocation.clearWatch(this.watchId);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.map && window.google && 
            (prevState.currentPosition !== this.state.currentPosition || !this.state.marker)) {
            // Remove existing marker if it exists
            if (this.state.marker) {
                this.state.marker.setMap(null);
            }

            // Create new marker only if we have valid coordinates
            if (this.state.currentPosition.lat !== 0) {
                const newMarker = new window.google.maps.Marker({
                    position: this.state.currentPosition,
                    map: this.state.map,
                    title: "Your Location"
                });

                this.setState({ marker: newMarker });
                this.state.map.panTo(this.state.currentPosition);
            }
        }
    }

    onLoad = (map) => {
        this.setState({ map });
    };

    render() {
        return (
            <LoadScript 
                googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API}
                libraries={LiveTracking.libraries}
            >
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={this.state.currentPosition}
                    zoom={15}
                    onLoad={this.onLoad}
                    mapId={import.meta.env.VITE_GOOGLE_MAPS_ID}
                >
                </GoogleMap>
            </LoadScript>
        );
    }
}

export default LiveTracking;