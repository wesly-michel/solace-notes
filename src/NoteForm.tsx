import { FormEvent, useRef, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { NoteData } from "./App";

type NoteFormProps = {
    onSubmit: (data: NoteData) => void
} & Partial<NoteData>

export function NoteForm({ onSubmit, title = "", body = "" }: NoteFormProps) {
    const navigation = useNavigate();
    const titleRef = useRef<HTMLInputElement>(null);
    const bodyRef = useRef<HTMLTextAreaElement>(null);
    const [validated, setValidated] = useState(false);

    function handleSubmit(e: FormEvent) {
        const form = e.currentTarget as HTMLFormElement;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            onSubmit({
                title: titleRef.current!.value,
                body: bodyRef.current!.value,
            });
            navigation('..');
        }

        setValidated(true);
    }

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Stack gap={4}>
                <Row>
                    <Col>
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                ref={titleRef}
                                required
                                defaultValue={title}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group controlId="body">
                    <Form.Label>Body</Form.Label>
                    <Form.Control
                        ref={bodyRef}
                        required
                        as="textarea"
                        rows={15}
                        defaultValue={body}
                        minLength={20}
                        maxLength={300}
                    />
                    <Form.Control.Feedback type="invalid">
                        Body must be between 20 and 300 characters.
                    </Form.Control.Feedback>
                </Form.Group>
                <Stack direction="horizontal" gap={2} className="justify-content-end">
                    <Button type="submit" variant="primary">Save</Button>
                    <Link to="..">
                        <Button type="button" variant="secondary">Cancel</Button>
                    </Link>
                </Stack>
            </Stack>
        </Form>
    )
}