<Container>
  <Row>
    <h3>Your Profile Information</h3>
  </Row>
  <Row>
    <Form>
      <Form.Group className="mb-3" controlId="username">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          type="text"
          placeholder="username"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email address:</Form.Label>
        <Form.Control
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          placeholder="Enter new email"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="birthday">
        <Form.Label>Birthday:</Form.Label>
        <Form.Control
          onChange={(e) => setBirthday(e.target.value)}
          value={birthday}
          type="date"
          placeholder="birthday"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          value={password}
          placeholder="Password"
        />
      </Form.Group>

      <Button variant="warning" onClick={updateUser}>
        Update you profile
      </Button>

      <Button className="deleteButton" variant="link" onClick={handleShow}>
        Delete your profile
      </Button>
    </Form>
  </Row>

  {cancelUserModal()}

  <p></p>
  <h2>Favorite Movies:</h2>

  {showFavoritesList()}
</Container>;
