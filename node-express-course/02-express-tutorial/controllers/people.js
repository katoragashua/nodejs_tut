const { people } = require("../data");

const getPeople = (req, res) => {
  res.status(200).json({ success: true, data: people });
};

const postPerson = (req, res) => {
  console.log(req.body);
  const { name } = req.body;
  if (!name.trim()) {
    return res
      .status(400)
      .json({ success: false, msg: "Please enter a name." });
  }
  res.status(200).json({ success: true, person: name });
};

const postPersonPostman = (req, res) => {
  const { name } = req.body;
  if (name.trim()) {
    return res.status(200).json({
      success: true,
      data: [...people, { id: people.length + 1, name: name }],
    });
  }
  res.status(401).json({ success: false, msg: "Enter a name" });
};

const updatePerson = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const person = people.find((per) => per.id === Number(id));

  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: "Please enter a valid id" });
  }

  const newPeople = people.map((person) => {
    if (person.id === Number(id)) {
      return { ...person, name: name };
    }
    return person;
  });

  if (!name.trim()) {
    return res.status(401).json({ success: false, msg: "Please enter a name" });
  }
  res.status(200).json({ success: true, data: newPeople });
};

const deletePerson = (req, res) => {
  const { id } = req.params;
  const person = people.find((p) => p.id === Number(id));

  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: "Person does not exist." });
  }

  const newPeople = people.filter((person) => person.id !== Number(id));
  res.status(200).json({ success: true, data: newPeople });
};

module.exports = {
    getPeople,
    postPerson,
    postPersonPostman,
    updatePerson,
    deletePerson
}