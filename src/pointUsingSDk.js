import React, { Component } from 'react';
// First way to import
import { ClipLoader } from 'react-spinners';
import {MDBBtn} from 'mdbreact';

class PointUsingSDk extends Component {
    state={
        popup: new window.mapboxgl.Popup({
            closeButton: false
        }),
        dataFeatures: [],
        draw:{}
    }

    // renderListings = (features) => {
    //     // Clear any existing listings
    //     this.listingEl.innerHTML = '';
    //     if (features.length) {
    //         let self = this;
    //         features.forEach(function(feature) {
    //             var prop = feature.properties;
    //             var item = document.createElement('a');
    //             item.target = '_blank';
    //             item.textContent = prop.title;
    //             item.addEventListener('mouseover', function() {
    //                 self.map.flyTo({
    //                     center:feature.geometry.coordinates 
    //                 });
    //                 // Highlight corresponding feature on the map
    //                 self.state.popup.setLngLat(feature.geometry.coordinates)
    //                 .setText(feature.properties.title)
    //                 .addTo(self.map);
    //             });
    //             item.addEventListener('mouseout', function() {
    //                 self.map.flyTo({
    //                     center:[72.772955, 21.164358],
    //                     zoom: 12
    //                 });
    //                 self.state.popup.remove();
    //             });
    //             self.listingEl.appendChild(item);
    //         });
         
    //     // Show the filter input
    //     this.filterInput.parentNode.style.display = 'block';
    //     }
    // }
    // normalize = (string) => {
    //     return string.trim().toLowerCase();
    // }

    // searchLocation = (e)=>{
    //     var value = this.normalize(e.target.value.trim());
    //     const self =this;
    //     //this.map.setLayoutProperty("real_estate", 'visibility', "real_estate".indexOf(value) > -1 ? 'visible' : 'none');
    //     let filtered = this.state.dataFeatures.filter(function(feature) {
    //         var name = self.normalize(feature.properties.title);
    //         let result = name.indexOf(value) > -1;
    //         // let marker_add=true;
    //         // for (let index = self.markers.length - 1; index >= 0; index --) {
    //         //     if(self.markers[index]._lngLat.lat===feature.geometry.coordinates[1] && 
    //         //         self.markers[index]._lngLat.lng===feature.geometry.coordinates[0]){
    //         //             if(!result){
    //         //                 self.markers[index].remove();
    //         //                 self.markers= self.markers.filter(function(value, marker_index){
    //         //                     return index!== marker_index;
    //         //                 });
    //         //                 console.log(self.markers.length);
    //         //             }
    //         //             marker_add = false;
    //         //         break;
    //         //     }
    //         // }
    //         // if(marker_add){
    //         //     self.markers.push(new window.mapboxgl.Marker()
    //         //             .setLngLat(feature.geometry.coordinates)
    //         //             .setPopup(new window.mapboxgl.Popup({ offset: 25 })
    //         //             .setText(feature.properties.description))
    //         //             .addTo(self.map));
    //         // }
    //         return result;
    //     });
        
    //     // Populate the sidebar with filtered results
    //     this.renderListings(filtered);
    //     if(filtered){
    //         // Set the filter to populate features into the layer.
    //         this.map.setFilter('real_estate', ['match', ['get', 'title'], filtered.map(function(feature) {
    //             return feature.properties.title;
    //         }), true, false]);
    //     }
    // }

    componentDidMount(){
        const self = this;
        const layerID = "real_estate";

        window.mapboxgl.accessToken = 'pk.eyJ1IjoiY2hpbnRhbnNvbmkxIiwiYSI6ImNqdmMxOHh1MzFkeWk0NG15bWJlbDYwN2sifQ.MT1hxtqXFw4QAXZ8MyfzCQ';
        self.map = new window.mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [72.772955, 21.164358],
            zoom: 12
        });

        self.map.on('load', function () {
            
            self.map.addSource("map_test_dataset", {
                type: "vector",
                url: "mapbox://chintansoni1.cjvc66bop17sa2wo0b3iiadyg-7k8vw"
            });

            // self.map.addLayer({
            //     'id': layerID,
            //     'type': 'circle',
            //     'source': 'map_test_dataset',
            //     'source-layer':"test_dataset",
            //     'paint': {
            //         // make circles larger as the user zooms from z12 to z22
            //         'circle-radius': {
            //         'base': 1.75,
            //         'stops': [[12, 2], [22, 180]]
            //     },
            //     // color circles by ethnicity, using a match expression
            //     // https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-match
            //     'circle-color': '#00e600',
            //     'circle-radius':5,
            //     'circle-stroke-width':5,
            //     'circle-stroke-color':'#000'
            //     }
            // });

            self.map.loadImage('https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/256/Map-Marker-Marker-Outside-Azure.png', function(error, image) {
                if (error) throw error;
                self.map.addImage('marker', image);
                self.map.addLayer({
                    "id": layerID,
                    "type": "symbol",
                    "source": 'map_test_dataset',
                    'source-layer':"new_dataset",
                    "layout": {
                        "icon-image": "marker",
                        "icon-size": 0.2
                    }
                });
                
                // self.filterInput = document.getElementById('feature-filter');
                // self.listingEl = document.getElementById('feature-listing');
               
            });
            
            // self.map.on('moveend', function() {
                
            // });

            

            // function forwardGeocoder(query) {
            //     var matchingFeatures = [];
            //     for (var i = 0; i < self.state.dataFeatures.length; i++) {
            //         var feature = self.state.dataFeatures[i];
            //         // handle queries with different capitalization than the source data by calling toLowerCase()
            //         if (feature.properties.title.toLowerCase().search(query.toLowerCase()) !== -1) {
            //             // add a tree emoji as a prefix for custom data results
            //             // using carmen geojson format: https://github.com/mapbox/carmen/blob/master/carmen-geojson.md
            //             feature['place_name'] = feature.properties.title;
            //             feature['center'] = feature.geometry.coordinates;
            //             feature['place_type'] = ['customize'];
            //             matchingFeatures.push(feature);
            //         }
            //     }
            //     return matchingFeatures;
            // }

            // function renderGeocoder(query) {
            //     let matched = false;
            //     for (var i = 0; i < self.state.dataFeatures.length; i++) {
            //         var feature = self.state.dataFeatures[i];
            //         // handle queries with different capitalization than the source data by calling toLowerCase()
            //         if (feature.properties.title.toLowerCase().search(query.place_name.toLowerCase()) !== -1) {
            //             // add a tree emoji as a prefix for custom data results
            //             // using carmen geojson format: https://github.com/mapbox/carmen/blob/master/carmen-geojson.md
            //             matched = true;
            //             break;
            //         }
            //     }
            //     if(matched){
            //         return "<div class='geocoder-dropdown-item'><span class='geocoder-dropdown-text'>" + feature.properties.title + "</span></div>";
            //     }
            //     else{
            //         return "<div class='geocoder-dropdown-item' style='display:none;'></div>";
            //     }
            // }
                 
            // self.map.addControl(new window.MapboxGeocoder({
            //     accessToken: window.mapboxgl.accessToken,
            //     localGeocoder: forwardGeocoder,
            //     zoom: 14,
            //     render: renderGeocoder,
            //     placeholder: "Enter search e.g. Home",
            //     mapboxgl: window.mapboxgl
            // }));
            // self.state.draw = new window.MapboxDraw({
            //     displayControlsDefault: false,
            //     controls: {
            //         circle: true,
            //         trash: true
            //     }
            // });
            
        });

        

        self.map.once('idle',function(){
            // let dataSource = self.map.querySourceFeatures("map_test_dataset",{sourceLayer:"test_dataset"});
            // self.state.dataFeatures = dataSource;
            // for(let index=0;index<dataSource.length;index++){
            //     self.markers.push(new window.mapboxgl.Marker()
            //     .setLngLat(dataSource[index].geometry.coordinates)
            //     .setPopup(new window.mapboxgl.Popup({ offset: 25 })
            //             .setText(dataSource[index]['properties']['description']))
            //     .addTo(self.map));
            //    // map.setFilter(layerID, ['in', 'title', dataSource[index]['properties']['title']]);
            // }
           
            var features = self.map.querySourceFeatures("map_test_dataset",{sourceLayer:"new_dataset"});
            //var features = self.map.queryRenderedFeatures({ layers: ['real_estate'] });
                 
            if (features) {
            // Populate features for the listing overlay.
            //self.renderListings(features);
             
            // Clear the input container
            //self.filterInput.value = '';
             
            // Store the current features in sn `airports` variable to
            // later use for filtering on `keyup`.
            self.state.dataFeatures = features;
            }
            
            
            if(Object.entries(self.props.map).length === 0 && self.props.map.constructor === Object){
                self.props.mapStateHandler(self.map);
            }
            else{
                var draw = new window.MapboxDraw({
                    displayControlsDefault: false,
                    controls: {
                    polygon: true,
                    trash: true
                    }
                });
                self.map.addControl(draw);
                //console.log(self.map,self.props.map,self.compare({a:"a",b:{c:"c"}},{a:"a",b:{c:"c"}}));
            }
            
        });
        
        
    }

    compare = (obj1, obj2) => {
        //Loop through properties in object 1
        for (var p in obj1) {
            //Check property exists on both objects
            if (obj1.hasOwnProperty(p) !== obj2.hasOwnProperty(p)) return false;
     
            switch (typeof (obj1[p])) {
                //Deep compare objects
                case 'object':
                    if (!this.compare(obj1[p], obj2[p])) return false;
                    break;
                //Compare function code
                case 'function':
                    if (typeof (obj2[p]) == 'undefined' || (p != 'compare' && obj1[p].toString() != obj2[p].toString())) return false;
                    break;
                //Compare values
                default:
                    if (obj1[p] != obj2[p]) return false;
            }
        }
     
        //Check object 2 for any extra properties
        for (var p in obj2) {
            if (typeof (obj1[p]) == 'undefined') return false;
        }
        return true;
    };

    render() {
        if(!(Object.entries(this.props.map).length === 0 && this.props.map.constructor === Object)){
            return (
                <div>
                    <div id='map'></div>
                    {/* <div className='map-overlay'>
                        <fieldset>
                            <input id='feature-filter' onKeyUp={this.searchLocation} type='text' placeholder='Filter results by name' />
                        </fieldset>
                        <div id='feature-listing' className='listing'></div>
                    </div> */}
                    <MDBBtn color="primary" style={ {position:'absolute', top:"10%", right:"20px"}} >Filter</MDBBtn>
                    <div className='calculation-box'>
                        <p>Draw a polygon using the draw tools.</p>
                        <div id='calculated-area'></div>
                    </div>
                </div>
            )
        }
        else{
            return (
                <div>
                     <div id='map' style={{display:"none"}}></div>
                     <div className='sweet-loading' style={{"marginLeft":"45%","marginTop":"20%"}}>
                        <ClipLoader
                            style={{display: "block",
                                    margin: "0 auto"}}
                            sizeUnit={"px"}
                            size={150}
                            color={'#123abc'}
                            loading={true}
                        />
                </div> 
                </div>
              )
        }
    }
}

export default PointUsingSDk;