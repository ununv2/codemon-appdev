import { Stack, Link } from 'expo-router';
import {Container} from '~/components/Container'
import {Text} from 'react-native'

export default function Login() {

    return (
        <>
            <Stack.Screen options={{ title: 'Login' }} />
            <Container className={styles.container}>
                <Text className={styles.label}>HHHH</Text>
            </Container>
        </>
    )
}

const styles = {
    container:'h-screen w-screen',
    label: 'justify-center ',
};