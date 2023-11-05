import React, {useRef} from "react";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
import Card from 'react-bootstrap/Card';
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { FaFilter } from 'react-icons/fa';
import InputGroup from 'react-bootstrap/InputGroup'
import Form from "react-bootstrap/Form";

function FragranceListings({
    xs,
    fragranceListings,
    showFilters,
    useOffcanvasFilters,
    setSearchInput,
    loadMoreListings,
    totalRows
}){
    const tempSearchInput = useRef('');
    const containerRef = useRef(null); // Ref for the scrollable container

    const viewFragranceListing = (fragranceListing) => {
        window.open(fragranceListing.link, '_blank');
    }

    const handleSearchInputSubmit = (event) => {
        event.preventDefault();
        setSearchInput(tempSearchInput.current);
        containerRef.current.scrollTop = 0;
    }


    // Scroll event handler
    const onScroll = () => {
        const container = containerRef.current;

        // Check if the user has scrolled to the bottom
        if (Math.round(container.scrollHeight - container.scrollTop) <= container.clientHeight) {
            loadMoreListings();
        }
    }

    return (
        <Col xs={xs} style={{
            maxHeight: '100%',
        }}>
            <Form onSubmit={handleSearchInputSubmit}>
                <InputGroup className="mb-3">
                    <Form.Control
                    placeholder="Search"
                    aria-label="Search"
                    onChange={(event) => tempSearchInput.current = event.target.value}
                    />
                    <Button type="submit" variant="outline-primary">
                    Button
                    </Button>
                </InputGroup>
            </Form>
            <h4>Results ({totalRows}) {useOffcanvasFilters && (
                <Button variant="secondary" onClick={showFilters}><FaFilter /> Filters</Button>
            )}</h4>
            <div style={{maxHeight: '95%', overflowY: 'auto', paddingBottom: '100px'}} onScroll={onScroll} ref={containerRef}>
                <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}} style={{maxWidth: '95%'}}>
                <Masonry columnsCount={3} gutter="10px">
                    {(fragranceListings.length
                        ? fragranceListings.map((f, i) => (
                            <Card key={i}>
                                <Card.Img  style={{cursor: 'pointer'}} variant="top" src={f.fragrance.photoLink} onClick={() => window.open(f.link, '_blank')} />
                                <Card.Body>
                                <Card.Title>{f.fragrance.title} ({f.sizeoz} oz)</Card.Title>
                                <div style={{marginLeft: '8px'}}>
                                    <Card.Subtitle>{f.fragrance.brand} ({f.fragrance.gender})</Card.Subtitle>
                                    <Card.Subtitle style={{marginTop: '4px'}}><strong>${f.price}</strong></Card.Subtitle>
                                </div>
                                <Button style={{marginTop: '12px'}} onClick={() => viewFragranceListing(f)} variant="primary" size="sm">See on {f.site}</Button>
                                </Card.Body>
                            </Card>
                        ))
                        : (<p>No Results</p>)
                    )}
                </Masonry>
                </ResponsiveMasonry>
            </div>
        </Col>
    )
};

export default FragranceListings;