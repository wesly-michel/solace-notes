import { useMemo, useState } from "react";
import { Button, Col, Form, Row, Stack, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

type HomeProps = {
    notes: SimplifiedNote[]
}

type SimplifiedNote = {
    title: string
    id: string
}
export function Home({ notes }: HomeProps) {
  const [title, setTitle] = useState("");

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        title === "" || note.title.toLowerCase().includes(title.toLowerCase())
      );
    });
  }, [notes, title]);

  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>Solace Notes</h1>
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to="/new">
              <Button variant="primary">Create a new Note</Button>
            </Link>
          </Stack>
        </Col>
      </Row>
      <Form className=" mb-4">
        <Row>
          <Col>
            <InputGroup>
              <Form.Control
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Search"
              />
              <InputGroup.Text>
                <FontAwesomeIcon icon={faSearch} />
              </InputGroup.Text>
            </InputGroup>
          </Col>
        </Row>
      </Form>
      <div className="card">
        <div className="card-header">Notes:</div>
        <ul className="list-group list-group-flush">
          {filteredNotes.map((note) => (
            <Link
              to={`/${note.id}`}
              style={{ textDecoration: "none" }}
              key={note.id}
            >
              <li className="list-group-item" id={note.id}>
                {note.title}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </>
  );
}
