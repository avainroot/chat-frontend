import React, {useContext} from "react";
import {Button, Result} from '@components';
import {useHistory} from "react-router-dom";
import {TranslatorContext} from "@context";

export const Page404 = () => {
    const history = useHistory();
    const { translator } = useContext(TranslatorContext);

    const localisation = translator.page404;


    return (
        <Result
            status="404"
            title="404"
            subTitle={localisation.subTitle}
            extra={<Button type="primary" onClick={() => history.goBack()}>{localisation.backHome}</Button>}
        />
    );
};