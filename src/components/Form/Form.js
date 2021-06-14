import { Component } from 'react';
import shortid from 'shortid';

import styles from './Form.module.css';

class Form extends Component {
  state = {
    id: '',
    name: '',
    number: '',
  };

  handleChange = e => {
    const { name, value } = e.currentTarget;

    this.setState({
      [name]: value,
      id: shortid.generate(),
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { savedContacts } = this.props;
    const { name } = this.state;

    const normalizedName = name.toLowerCase();

    if (
      savedContacts.find(contact =>
        contact.name.toLowerCase().includes(normalizedName),
      )
    ) {
      window.alert(`${name} is already in contacts`);
      return;
    }

    this.props.onSubmit(this.state);

    this.resetForm();
  };

  resetForm = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div className={styles.form__container}>
          <label className={styles.label}>
            Name
            <input
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
              required
              className={styles.input}
              onChange={this.handleChange}
              value={name}
            />
          </label>

          <label className={styles.label}>
            Number
            <input
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
              required
              className={styles.input}
              onChange={this.handleChange}
              value={number}
            />
          </label>
        </div>

        <button type="submit" className={styles.button}>
          Add contact
        </button>
      </form>
    );
  }
}

export default Form;
