import React from 'react';
import { withFormik, Field } from 'formik';
import PropTypes from 'prop-types';
import ButtonSubmit from '../Elements/ButtonSubmit';
import { css } from '@emotion/core';
import { dataStore } from '../../../../dataStore';

const DetailCart = ({ items }) => {
  const style = css`
    ul {
      margin: 0px;
    }
    img {
      max-width: 80px;
      max-height: 80px;
    }
    p {
      margin: 0px;
    }
  `;

  return (
    <div css={style}>
      <ul>
        {items.map(([img, name, unit, price], key) => (
          <li key={key}>
            <img src={img} />
            <p>{name}</p><p>{unit}</p><p>{price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

DetailCart.propTypes = {
  items: PropTypes.array.isRequired
};

const DetailPay = ({ pay }) => {
  const style = css`
    border-bottom: solid 1px #0f84fe;
    dl {
      &::after {
        content: "";
        display: block;
        clear: both;
      }
    }
    dt {
      display: block;
      margin-left: 0px;
      float: left;
      clear: left;
      width: 65%;
    }
    dd {
      display: block;
      float: left;
    }
  `;

  return (
    <div css={style}>
      <dl>
        {pay.map(([title, price], key) => (
          <div key={key}>
            <dt>{title}</dt>
            <dd>{price}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

DetailPay.propTypes = {
  pay: PropTypes.array.isRequired
};

const DetailDelivery = ({ delivery }) => {
  const [fullname, address, dateTime] = delivery;

  const style = css`
    border-bottom: solid 1px #0f84fe;
  `;
  return (
    <div css={style}>
      <dl>
        <dd>{fullname}</dd>
        {address.map((title, key) => <dd key={key}>{title}</dd>)}
        <br />
        {dateTime.map((title, key) => <dd key={key}>{title}</dd>)}
      </dl>
    </div>
  );
};

DetailDelivery.propTypes = {
  delivery: PropTypes.array.isRequired
};

const Supplement = ({ content }) => {
  const style = css`
    font-size: 14px;
    text-align: center;
    margin: 5px 0px;
  `;

  return (
    <>
      {content && <p dangerouslySetInnerHTML={{ __html: content }} css={style} />}
    </>
  );
};

Supplement.propTypes = {
  content: PropTypes.string
};

const base = css`
  color: #676879;
  border-radius: 5px;
  border: solid 2px #0f84fe;
  background-color: #fff;
  padding: 10px;
  line-height: 1.2em;
  font-size: 1.0em;
  h3 {
    margin 10px 0px 5px 0px;
  }
  ul {
    list-style: none;
    padding-left: 0px;
  }
  dl {
    margin: 10px 0px;
  }
  dd {
    margin-left: 0px;
  }
`;

const form = (props) => {
  const { handleSubmit } = props;
  const { pay, items, delivery, supplement } = dataStore.confirm;

  return (
    <form css={base} onSubmit={handleSubmit}>
      <Field component={ButtonSubmit} />
      <p css={{ textAlign: 'center', marginTop: 5 }}>下記の内容にお間違いなければボタンを押してください。</p>
      <h3>ご購入内容</h3>
      <DetailCart items={items} />
      <DetailPay pay={pay} />
      <h3>お届先住所</h3>
      <DetailDelivery delivery={delivery} />
      <Supplement content={supplement} />
      <Field name="confirmed" type="hidden" />
      <Field component={ButtonSubmit} />
    </form>
  );
};

form.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

const FormConfirm = withFormik({
  mapPropsToValues: () => ({ confirmed: true }),
  handleSubmit: (values, { props, setSubmitting }) => {
    if (Object.keys(values).every(key => dataStore[key] !== null)) props.onUpdate();
    Object.keys(values).forEach(key => dataStore[key] = values[key]);
    props.onSubmited();
    setSubmitting(false);
  },
})(form);

export default FormConfirm;