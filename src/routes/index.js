import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Welcome from '../pages/Welcome';
import SignIn from '../pages/SignIn';
import Registro from '../pages/SignIn/Registro';
import Homescreen from '../pages/Homescreen';
import NewServico from '../pages/NewServico';
import Editar from '../pages/Editar'

const Stack = createNativeStackNavigator();

export default function Routes() {
    return (
        <Stack.Navigator>

            <Stack.Screen
                name="Editar"
                component={Editar}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="Welcome"
                component={Welcome}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="SignIn"
                component={SignIn}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="Registro"
                component={Registro}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="Homescreen"
                component={Homescreen}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="NewServico"
                component={NewServico}
                options={{ headerShown: false }}
            />


        </Stack.Navigator>

    )

}