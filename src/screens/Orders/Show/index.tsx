import React, { useEffect } from "react";
import OrdersShowStore from "./store";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import styles from "./styles.m.styl";
import Item from "./components/Item";

type ShowParams = {
  id: string;
};

const OrdersShow = observer(
  (): JSX.Element => {
    const [state] = React.useState(new OrdersShowStore());
    const params: ShowParams = useParams();

    React.useEffect(() => {
      if (state.initialized) return;
      state.initialize(params.id);
    });

    if (!state.initialized || !state.order) return <></>;

    if (state.loading) return <span>Loading...</span>;

    return (
      <div className={styles.screenWrapper}>
        <div className={styles.screen}>
          <div className={styles.items}>
            {state.order.items.map((item) => (
              <Item item={item} key={item.id} />
            ))}
          </div>
        </div>
      </div>
    );
  }
);

export default OrdersShow;
