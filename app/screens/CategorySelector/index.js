import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, TouchableOpacity } from 'react-native';
import { BaseStyle, useTheme } from '@config';
import { SafeAreaView, Icon, Text } from '@components';
import { ApplicationActions } from '@actions';
import styles from './styles';
import { useTranslation } from 'react-i18next';

export default function CategorySelector({ navigation }) {
    const { t } = useTranslation();
    const { colors } = useTheme();
    const dispatch = useDispatch();

    const storageCategory = useSelector(state => state.application.category);
    const [selectedCategory, setSelectedCategory] = useState(storageCategory);

    const categories = ['Spots', 'Restaurants', 'Entertainments', 'Natures', 'Events', 'Hotels', 'Tours'];

    useEffect(() => {
        setSelectedCategory(storageCategory);
    }, [storageCategory]);

    const onChange = selectedCategory => {
        dispatch(ApplicationActions.onChangeCategory(selectedCategory));
    };
    

    return (
        <SafeAreaView
            style={BaseStyle.safeAreaView}
            edges={['right', 'left', 'bottom']}
        >
            <View style={styles.contain}>
                <View style={[styles.contentModal, { backgroundColor: colors.card }]}>
                    <View style={{ padding: 8 }}>
                        {categories.map((category, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.item,
                                    { borderBottomColor: colors.border, borderBottomWidth: 1 },
                                ]}
                                onPress={() => setSelectedCategory(category)}
                            >
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text body1 style={{ marginHorizontal: 8 }}>
                                        {t(category)}
                                    </Text>
                                </View>
                                {selectedCategory === category && (
                                    <Icon name="check" size={18} color={colors.primary} />
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>
                    <View style={styles.contentAction}>
                        <TouchableOpacity
                            style={{ padding: 8, marginHorizontal: 24 }}
                            onPress={() => navigation.goBack()}
                        >
                            <Text body1 grayColor>
                                {t('cancel')}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{ padding: 8 }}
                            onPress={() => {
                                onChange(selectedCategory);
                                navigation.goBack();
                            }}
                        >
                            <Text body1 primaryColor>
                                {t('apply')}
                            </Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}
