/*Kelly Nolte
Student Number:218275358
 DashboardScreen*/

import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

export default function Dashboard() {
    return (
        <ScrollView
            style={{
                flex: 1,
                backgroundColor: '#F5F5F5',
                padding: 20
            }}
        >
            <Text
                style={{
                    fontSize: 28,
                    fontWeight: 'bold',
                    marginBottom: 5
                }}
            >
                Good Morning
            </Text>

            <Text
                style={{
                    fontSize: 16,
                    color: 'gray',
                    marginBottom: 20
                }}
            >
                Welcome to SafeBite
            </Text>

            <TouchableOpacity
                style={{
                    backgroundColor: '#2E7D32',
                    padding: 15,
                    borderRadius: 10,
                    alignItems: 'center',
                    marginBottom: 25
                }}
            >
                <Text
                    style={{
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: 16
                    }}
                >
                    Tap To Scan Barcode
                </Text>
            </TouchableOpacity>

            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 20
                }}
            >
                <View
                    style={{
                        backgroundColor: 'white',
                        width: '30%',
                        padding: 15,
                        borderRadius: 10,
                        alignItems: 'center'
                    }}
                >
                    <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
                        12
                    </Text>
                    <Text>Safe</Text>
                </View>

                <View
                    style={{
                        backgroundColor: 'white',
                        width: '30%',
                        padding: 15,
                        borderRadius: 10,
                        alignItems: 'center'
                    }}
                >
                    <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
                        3
                    </Text>
                    <Text>Soon</Text>
                </View>

                <View
                    style={{
                        backgroundColor: 'white',
                        width: '30%',
                        padding: 15,
                        borderRadius: 10,
                        alignItems: 'center'
                    }}
                >
                    <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
                        1
                    </Text>
                    <Text>Expired</Text>
                </View>
            </View>

            <Text
                style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    marginBottom: 10
                }}
            >
                Recent Items
            </Text>

            <View
                style={{
                    backgroundColor: 'white',
                    padding: 15,
                    borderRadius: 10,
                    marginBottom: 10
                }}
            >
                <Text style={{ fontWeight: 'bold' }}>
                    Lucky Star Pilchards
                </Text>
                <Text>Expires in 3 days</Text>
            </View>

            <View
                style={{
                    backgroundColor: 'white',
                    padding: 15,
                    borderRadius: 10,
                    marginBottom: 10
                }}
            >
                <Text style={{ fontWeight: 'bold' }}>
                    Sasko Brown Bread
                </Text>
                <Text>Expires Tomorrow</Text>
            </View>

            <View
                style={{
                    backgroundColor: 'white',
                    padding: 15,
                    borderRadius: 10
                }}
            >
                <Text style={{ fontWeight: 'bold' }}>
                    Koo Peach Slices
                </Text>
                <Text>Expired 2 days ago</Text>
            </View>
        </ScrollView>
    );
}//end of class