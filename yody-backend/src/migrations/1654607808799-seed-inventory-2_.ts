import { MigrationInterface, QueryRunner } from 'typeorm'

export class seedInventory2_1654607808799 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`insert into inventory (product_variation_id, amount) values (1001, 12);
      insert into inventory (product_variation_id, amount) values (1002, 44);
      insert into inventory (product_variation_id, amount) values (1003, 93);
      insert into inventory (product_variation_id, amount) values (1004, 82);
      insert into inventory (product_variation_id, amount) values (1005, 20);
      insert into inventory (product_variation_id, amount) values (1006, 64);
      insert into inventory (product_variation_id, amount) values (1007, 82);
      insert into inventory (product_variation_id, amount) values (1008, 89);
      insert into inventory (product_variation_id, amount) values (1009, 69);
      insert into inventory (product_variation_id, amount) values (1010, 79);
      insert into inventory (product_variation_id, amount) values (1011, 41);
      insert into inventory (product_variation_id, amount) values (1012, 61);
      insert into inventory (product_variation_id, amount) values (1013, 55);
      insert into inventory (product_variation_id, amount) values (1014, 82);
      insert into inventory (product_variation_id, amount) values (1015, 100);
      insert into inventory (product_variation_id, amount) values (1016, 40);
      insert into inventory (product_variation_id, amount) values (1017, 2);
      insert into inventory (product_variation_id, amount) values (1018, 46);
      insert into inventory (product_variation_id, amount) values (1019, 27);
      insert into inventory (product_variation_id, amount) values (1020, 12);
      insert into inventory (product_variation_id, amount) values (1021, 52);
      insert into inventory (product_variation_id, amount) values (1022, 63);
      insert into inventory (product_variation_id, amount) values (1023, 26);
      insert into inventory (product_variation_id, amount) values (1024, 39);
      insert into inventory (product_variation_id, amount) values (1025, 65);
      insert into inventory (product_variation_id, amount) values (1026, 56);
      insert into inventory (product_variation_id, amount) values (1027, 39);
      insert into inventory (product_variation_id, amount) values (1028, 27);
      insert into inventory (product_variation_id, amount) values (1029, 10);
      insert into inventory (product_variation_id, amount) values (1030, 51);
      insert into inventory (product_variation_id, amount) values (1031, 41);
      insert into inventory (product_variation_id, amount) values (1032, 11);
      insert into inventory (product_variation_id, amount) values (1033, 19);
      insert into inventory (product_variation_id, amount) values (1034, 38);
      insert into inventory (product_variation_id, amount) values (1035, 3);
      insert into inventory (product_variation_id, amount) values (1036, 49);
      insert into inventory (product_variation_id, amount) values (1037, 25);
      insert into inventory (product_variation_id, amount) values (1038, 24);
      insert into inventory (product_variation_id, amount) values (1039, 60);
      insert into inventory (product_variation_id, amount) values (1041, 35);
      insert into inventory (product_variation_id, amount) values (1042, 82);
      insert into inventory (product_variation_id, amount) values (1043, 81);
      insert into inventory (product_variation_id, amount) values (1044, 80);
      insert into inventory (product_variation_id, amount) values (1045, 64);
      insert into inventory (product_variation_id, amount) values (1046, 73);
      insert into inventory (product_variation_id, amount) values (1047, 69);
      insert into inventory (product_variation_id, amount) values (1048, 58);
      insert into inventory (product_variation_id, amount) values (1049, 53);
      insert into inventory (product_variation_id, amount) values (1050, 46);
      insert into inventory (product_variation_id, amount) values (1051, 92);
      insert into inventory (product_variation_id, amount) values (1052, 69);
      insert into inventory (product_variation_id, amount) values (1053, 36);
      insert into inventory (product_variation_id, amount) values (1054, 44);
      insert into inventory (product_variation_id, amount) values (1055, 41);
      insert into inventory (product_variation_id, amount) values (1056, 22);
      insert into inventory (product_variation_id, amount) values (1057, 62);
      insert into inventory (product_variation_id, amount) values (1058, 62);
      insert into inventory (product_variation_id, amount) values (1059, 74);
      insert into inventory (product_variation_id, amount) values (1060, 1);
      insert into inventory (product_variation_id, amount) values (1061, 42);
      insert into inventory (product_variation_id, amount) values (1062, 98);
      insert into inventory (product_variation_id, amount) values (1063, 17);
      insert into inventory (product_variation_id, amount) values (1064, 56);
      insert into inventory (product_variation_id, amount) values (1065, 74);
      insert into inventory (product_variation_id, amount) values (1066, 82);
      insert into inventory (product_variation_id, amount) values (1067, 10);
      insert into inventory (product_variation_id, amount) values (1068, 63);
      insert into inventory (product_variation_id, amount) values (1069, 77);
      insert into inventory (product_variation_id, amount) values (1070, 82);
      insert into inventory (product_variation_id, amount) values (1071, 39);
      insert into inventory (product_variation_id, amount) values (1072, 97);
      insert into inventory (product_variation_id, amount) values (1073, 4);
      insert into inventory (product_variation_id, amount) values (1074, 20);
      insert into inventory (product_variation_id, amount) values (1075, 73);
      insert into inventory (product_variation_id, amount) values (1076, 81);
      insert into inventory (product_variation_id, amount) values (1077, 76);
      insert into inventory (product_variation_id, amount) values (1078, 11);
      insert into inventory (product_variation_id, amount) values (1079, 41);
      insert into inventory (product_variation_id, amount) values (1080, 26);
      insert into inventory (product_variation_id, amount) values (1081, 10);
      insert into inventory (product_variation_id, amount) values (1082, 18);
      insert into inventory (product_variation_id, amount) values (1083, 5);
      insert into inventory (product_variation_id, amount) values (1085, 24);
      insert into inventory (product_variation_id, amount) values (1086, 45);
      insert into inventory (product_variation_id, amount) values (1087, 42);
      insert into inventory (product_variation_id, amount) values (1088, 80);
      insert into inventory (product_variation_id, amount) values (1089, 8);
      insert into inventory (product_variation_id, amount) values (1090, 52);
      insert into inventory (product_variation_id, amount) values (1091, 59);
      insert into inventory (product_variation_id, amount) values (1092, 67);
      insert into inventory (product_variation_id, amount) values (1093, 87);
      insert into inventory (product_variation_id, amount) values (1094, 70);
      insert into inventory (product_variation_id, amount) values (1095, 59);
      insert into inventory (product_variation_id, amount) values (1096, 58);
      insert into inventory (product_variation_id, amount) values (1097, 77);
      insert into inventory (product_variation_id, amount) values (1098, 6);
      insert into inventory (product_variation_id, amount) values (1099, 76);
      insert into inventory (product_variation_id, amount) values (1101, 32);
      insert into inventory (product_variation_id, amount) values (1102, 36);
      insert into inventory (product_variation_id, amount) values (1103, 11);
      insert into inventory (product_variation_id, amount) values (1104, 73);
      insert into inventory (product_variation_id, amount) values (1105, 44);
      insert into inventory (product_variation_id, amount) values (1106, 64);
      insert into inventory (product_variation_id, amount) values (1107, 19);
      insert into inventory (product_variation_id, amount) values (1108, 75);
      insert into inventory (product_variation_id, amount) values (1109, 79);
      insert into inventory (product_variation_id, amount) values (1110, 62);
      insert into inventory (product_variation_id, amount) values (1111, 35);
      insert into inventory (product_variation_id, amount) values (1112, 95);
      insert into inventory (product_variation_id, amount) values (1113, 60);
      insert into inventory (product_variation_id, amount) values (1114, 96);
      insert into inventory (product_variation_id, amount) values (1115, 41);
      insert into inventory (product_variation_id, amount) values (1116, 56);
      insert into inventory (product_variation_id, amount) values (1117, 34);
      insert into inventory (product_variation_id, amount) values (1118, 65);
      insert into inventory (product_variation_id, amount) values (1119, 3);
      insert into inventory (product_variation_id, amount) values (1120, 74);
      insert into inventory (product_variation_id, amount) values (1121, 48);
      insert into inventory (product_variation_id, amount) values (1122, 32);
      insert into inventory (product_variation_id, amount) values (1123, 10);
      insert into inventory (product_variation_id, amount) values (1124, 23);
      insert into inventory (product_variation_id, amount) values (1125, 49);
      insert into inventory (product_variation_id, amount) values (1126, 55);
      insert into inventory (product_variation_id, amount) values (1127, 21);
      insert into inventory (product_variation_id, amount) values (1128, 68);
      insert into inventory (product_variation_id, amount) values (1129, 89);
      insert into inventory (product_variation_id, amount) values (1130, 21);
      insert into inventory (product_variation_id, amount) values (1131, 36);
      insert into inventory (product_variation_id, amount) values (1132, 73);
      insert into inventory (product_variation_id, amount) values (1133, 43);
      insert into inventory (product_variation_id, amount) values (1134, 100);
      insert into inventory (product_variation_id, amount) values (1135, 41);
      insert into inventory (product_variation_id, amount) values (1136, 50);
      insert into inventory (product_variation_id, amount) values (1137, 94);
      insert into inventory (product_variation_id, amount) values (1138, 60);
      insert into inventory (product_variation_id, amount) values (1139, 18);
      insert into inventory (product_variation_id, amount) values (1140, 1);
      insert into inventory (product_variation_id, amount) values (1141, 46);
      insert into inventory (product_variation_id, amount) values (1142, 3);
      insert into inventory (product_variation_id, amount) values (1143, 57);
      insert into inventory (product_variation_id, amount) values (1144, 48);
      insert into inventory (product_variation_id, amount) values (1145, 55);
      insert into inventory (product_variation_id, amount) values (1146, 92);
      insert into inventory (product_variation_id, amount) values (1147, 95);
      insert into inventory (product_variation_id, amount) values (1148, 10);
      insert into inventory (product_variation_id, amount) values (1149, 24);
      insert into inventory (product_variation_id, amount) values (1150, 6);
      insert into inventory (product_variation_id, amount) values (1151, 38);
      insert into inventory (product_variation_id, amount) values (1152, 54);
      insert into inventory (product_variation_id, amount) values (1153, 76);
      insert into inventory (product_variation_id, amount) values (1154, 64);
      insert into inventory (product_variation_id, amount) values (1155, 82);
      insert into inventory (product_variation_id, amount) values (1156, 64);
      insert into inventory (product_variation_id, amount) values (1158, 35);
      insert into inventory (product_variation_id, amount) values (1159, 86);
      insert into inventory (product_variation_id, amount) values (1160, 70);
      insert into inventory (product_variation_id, amount) values (1161, 74);
      insert into inventory (product_variation_id, amount) values (1162, 32);
      insert into inventory (product_variation_id, amount) values (1163, 7);
      insert into inventory (product_variation_id, amount) values (1164, 87);
      insert into inventory (product_variation_id, amount) values (1165, 7);
      insert into inventory (product_variation_id, amount) values (1166, 17);
      insert into inventory (product_variation_id, amount) values (1167, 87);
      insert into inventory (product_variation_id, amount) values (1168, 77);
      insert into inventory (product_variation_id, amount) values (1169, 85);
      insert into inventory (product_variation_id, amount) values (1170, 94);
      insert into inventory (product_variation_id, amount) values (1171, 18);
      insert into inventory (product_variation_id, amount) values (1172, 74);
      insert into inventory (product_variation_id, amount) values (1173, 31);
      insert into inventory (product_variation_id, amount) values (1174, 52);
      insert into inventory (product_variation_id, amount) values (1175, 62);
      insert into inventory (product_variation_id, amount) values (1176, 17);
      insert into inventory (product_variation_id, amount) values (1178, 95);
      insert into inventory (product_variation_id, amount) values (1179, 49);
      insert into inventory (product_variation_id, amount) values (1180, 3);
      insert into inventory (product_variation_id, amount) values (1181, 56);
      insert into inventory (product_variation_id, amount) values (1182, 61);
      insert into inventory (product_variation_id, amount) values (1183, 40);
      insert into inventory (product_variation_id, amount) values (1184, 68);
      insert into inventory (product_variation_id, amount) values (1185, 64);
      insert into inventory (product_variation_id, amount) values (1186, 33);
      insert into inventory (product_variation_id, amount) values (1187, 7);
      insert into inventory (product_variation_id, amount) values (1188, 17);
      insert into inventory (product_variation_id, amount) values (1189, 53);
      insert into inventory (product_variation_id, amount) values (1190, 2);
      insert into inventory (product_variation_id, amount) values (1191, 6);
      insert into inventory (product_variation_id, amount) values (1192, 45);
      insert into inventory (product_variation_id, amount) values (1193, 5);
      insert into inventory (product_variation_id, amount) values (1194, 42);
      insert into inventory (product_variation_id, amount) values (1195, 67);
      insert into inventory (product_variation_id, amount) values (1196, 40);
      insert into inventory (product_variation_id, amount) values (1197, 77);
      insert into inventory (product_variation_id, amount) values (1198, 48);
      insert into inventory (product_variation_id, amount) values (1199, 34);
      insert into inventory (product_variation_id, amount) values (1200, 41);
      insert into inventory (product_variation_id, amount) values (1201, 26);
      insert into inventory (product_variation_id, amount) values (1202, 1);
      insert into inventory (product_variation_id, amount) values (1203, 40);
      insert into inventory (product_variation_id, amount) values (1204, 75);
      insert into inventory (product_variation_id, amount) values (1205, 13);
      insert into inventory (product_variation_id, amount) values (1206, 11);
      insert into inventory (product_variation_id, amount) values (1207, 27);
      insert into inventory (product_variation_id, amount) values (1208, 73);
      insert into inventory (product_variation_id, amount) values (1209, 25);
      insert into inventory (product_variation_id, amount) values (1210, 21);
      insert into inventory (product_variation_id, amount) values (1211, 3);
      insert into inventory (product_variation_id, amount) values (1212, 3);
      insert into inventory (product_variation_id, amount) values (1213, 8);
      insert into inventory (product_variation_id, amount) values (1214, 1);
      insert into inventory (product_variation_id, amount) values (1215, 45);
      insert into inventory (product_variation_id, amount) values (1216, 47);
      insert into inventory (product_variation_id, amount) values (1217, 96);
      insert into inventory (product_variation_id, amount) values (1218, 3);
      insert into inventory (product_variation_id, amount) values (1219, 19);
      insert into inventory (product_variation_id, amount) values (1220, 96);
      insert into inventory (product_variation_id, amount) values (1221, 65);
      insert into inventory (product_variation_id, amount) values (1222, 10);
      insert into inventory (product_variation_id, amount) values (1223, 84);
      insert into inventory (product_variation_id, amount) values (1224, 6);
      insert into inventory (product_variation_id, amount) values (1225, 60);
      insert into inventory (product_variation_id, amount) values (1226, 71);
      insert into inventory (product_variation_id, amount) values (1227, 40);
      insert into inventory (product_variation_id, amount) values (1228, 2);
      insert into inventory (product_variation_id, amount) values (1229, 30);
      insert into inventory (product_variation_id, amount) values (1230, 12);
      insert into inventory (product_variation_id, amount) values (1231, 35);
      insert into inventory (product_variation_id, amount) values (1232, 6);
      insert into inventory (product_variation_id, amount) values (1233, 100);
      insert into inventory (product_variation_id, amount) values (1234, 50);
      insert into inventory (product_variation_id, amount) values (1235, 57);
      insert into inventory (product_variation_id, amount) values (1236, 18);
      insert into inventory (product_variation_id, amount) values (1237, 53);
      insert into inventory (product_variation_id, amount) values (1238, 90);
      insert into inventory (product_variation_id, amount) values (1239, 52);
      insert into inventory (product_variation_id, amount) values (1241, 60);
      insert into inventory (product_variation_id, amount) values (1242, 48);
      insert into inventory (product_variation_id, amount) values (1243, 40);
      insert into inventory (product_variation_id, amount) values (1244, 11);
      insert into inventory (product_variation_id, amount) values (1245, 59);
      insert into inventory (product_variation_id, amount) values (1246, 99);
      insert into inventory (product_variation_id, amount) values (1247, 20);
      insert into inventory (product_variation_id, amount) values (1248, 71);
      insert into inventory (product_variation_id, amount) values (1249, 91);
      insert into inventory (product_variation_id, amount) values (1250, 86);
      insert into inventory (product_variation_id, amount) values (1251, 50);
      insert into inventory (product_variation_id, amount) values (1252, 43);
      insert into inventory (product_variation_id, amount) values (1253, 7);
      insert into inventory (product_variation_id, amount) values (1254, 62);
      insert into inventory (product_variation_id, amount) values (1255, 6);
      insert into inventory (product_variation_id, amount) values (1256, 82);
      insert into inventory (product_variation_id, amount) values (1257, 70);
      insert into inventory (product_variation_id, amount) values (1258, 35);
      insert into inventory (product_variation_id, amount) values (1259, 56);
      insert into inventory (product_variation_id, amount) values (1260, 87);
      insert into inventory (product_variation_id, amount) values (1261, 80);
      insert into inventory (product_variation_id, amount) values (1262, 3);
      insert into inventory (product_variation_id, amount) values (1263, 87);
      insert into inventory (product_variation_id, amount) values (1264, 15);
      insert into inventory (product_variation_id, amount) values (1265, 82);
      insert into inventory (product_variation_id, amount) values (1267, 55);
      insert into inventory (product_variation_id, amount) values (1268, 69);
      insert into inventory (product_variation_id, amount) values (1269, 52);
      insert into inventory (product_variation_id, amount) values (1270, 51);
      insert into inventory (product_variation_id, amount) values (1271, 94);
      insert into inventory (product_variation_id, amount) values (1272, 32);
      insert into inventory (product_variation_id, amount) values (1273, 23);
      insert into inventory (product_variation_id, amount) values (1274, 78);
      insert into inventory (product_variation_id, amount) values (1275, 24);
      insert into inventory (product_variation_id, amount) values (1276, 81);
      insert into inventory (product_variation_id, amount) values (1277, 34);
      insert into inventory (product_variation_id, amount) values (1278, 86);
      insert into inventory (product_variation_id, amount) values (1279, 9);
      insert into inventory (product_variation_id, amount) values (1280, 51);
      insert into inventory (product_variation_id, amount) values (1281, 7);
      insert into inventory (product_variation_id, amount) values (1282, 13);
      insert into inventory (product_variation_id, amount) values (1283, 82);
      insert into inventory (product_variation_id, amount) values (1284, 13);
      insert into inventory (product_variation_id, amount) values (1285, 43);
      insert into inventory (product_variation_id, amount) values (1286, 21);
      insert into inventory (product_variation_id, amount) values (1287, 24);
      insert into inventory (product_variation_id, amount) values (1288, 61);
      insert into inventory (product_variation_id, amount) values (1289, 92);
      insert into inventory (product_variation_id, amount) values (1290, 40);
      insert into inventory (product_variation_id, amount) values (1291, 38);
      insert into inventory (product_variation_id, amount) values (1292, 77);
      insert into inventory (product_variation_id, amount) values (1293, 99);
      insert into inventory (product_variation_id, amount) values (1294, 68);
      insert into inventory (product_variation_id, amount) values (1295, 5);
      insert into inventory (product_variation_id, amount) values (1296, 89);
      insert into inventory (product_variation_id, amount) values (1297, 56);
      insert into inventory (product_variation_id, amount) values (1298, 17);
      insert into inventory (product_variation_id, amount) values (1299, 14);
      insert into inventory (product_variation_id, amount) values (1300, 48);
      insert into inventory (product_variation_id, amount) values (1301, 66);
      insert into inventory (product_variation_id, amount) values (1302, 30);
      insert into inventory (product_variation_id, amount) values (1303, 8);
      insert into inventory (product_variation_id, amount) values (1304, 72);
      insert into inventory (product_variation_id, amount) values (1305, 88);
      insert into inventory (product_variation_id, amount) values (1306, 66);
      insert into inventory (product_variation_id, amount) values (1307, 64);
      insert into inventory (product_variation_id, amount) values (1308, 1);
      insert into inventory (product_variation_id, amount) values (1309, 42);
      insert into inventory (product_variation_id, amount) values (1310, 63);
      insert into inventory (product_variation_id, amount) values (1311, 28);
      insert into inventory (product_variation_id, amount) values (1312, 82);
      insert into inventory (product_variation_id, amount) values (1313, 59);
      insert into inventory (product_variation_id, amount) values (1314, 8);
      insert into inventory (product_variation_id, amount) values (1315, 75);
      insert into inventory (product_variation_id, amount) values (1316, 35);
      insert into inventory (product_variation_id, amount) values (1317, 37);
      insert into inventory (product_variation_id, amount) values (1318, 75);
      insert into inventory (product_variation_id, amount) values (1319, 33);
      insert into inventory (product_variation_id, amount) values (1320, 78);
      insert into inventory (product_variation_id, amount) values (1321, 41);
      insert into inventory (product_variation_id, amount) values (1322, 88);
      insert into inventory (product_variation_id, amount) values (1323, 54);
      insert into inventory (product_variation_id, amount) values (1324, 79);
      insert into inventory (product_variation_id, amount) values (1325, 38);
      insert into inventory (product_variation_id, amount) values (1326, 17);
      insert into inventory (product_variation_id, amount) values (1327, 41);
      insert into inventory (product_variation_id, amount) values (1328, 29);
      insert into inventory (product_variation_id, amount) values (1329, 25);
      insert into inventory (product_variation_id, amount) values (1330, 36);
      insert into inventory (product_variation_id, amount) values (1331, 26);
      insert into inventory (product_variation_id, amount) values (1332, 51);
      insert into inventory (product_variation_id, amount) values (1333, 30);
      insert into inventory (product_variation_id, amount) values (1334, 80);
      insert into inventory (product_variation_id, amount) values (1335, 9);
      insert into inventory (product_variation_id, amount) values (1336, 16);
      insert into inventory (product_variation_id, amount) values (1337, 40);
      insert into inventory (product_variation_id, amount) values (1338, 14);
      insert into inventory (product_variation_id, amount) values (1339, 67);
      insert into inventory (product_variation_id, amount) values (1340, 88);
      insert into inventory (product_variation_id, amount) values (1341, 40);
      insert into inventory (product_variation_id, amount) values (1342, 15);
      insert into inventory (product_variation_id, amount) values (1343, 90);
      insert into inventory (product_variation_id, amount) values (1344, 83);
      insert into inventory (product_variation_id, amount) values (1345, 21);
      insert into inventory (product_variation_id, amount) values (1346, 18);
      insert into inventory (product_variation_id, amount) values (1347, 40);
      insert into inventory (product_variation_id, amount) values (1348, 54);
      insert into inventory (product_variation_id, amount) values (1349, 50);
      insert into inventory (product_variation_id, amount) values (1350, 14);
      insert into inventory (product_variation_id, amount) values (1351, 18);
      insert into inventory (product_variation_id, amount) values (1352, 76);
      insert into inventory (product_variation_id, amount) values (1353, 20);
      insert into inventory (product_variation_id, amount) values (1354, 94);
      insert into inventory (product_variation_id, amount) values (1355, 64);
      insert into inventory (product_variation_id, amount) values (1356, 39);
      insert into inventory (product_variation_id, amount) values (1357, 72);
      insert into inventory (product_variation_id, amount) values (1358, 85);
      insert into inventory (product_variation_id, amount) values (1359, 69);
      insert into inventory (product_variation_id, amount) values (1360, 95);
      insert into inventory (product_variation_id, amount) values (1361, 62);
      insert into inventory (product_variation_id, amount) values (1362, 45);
      insert into inventory (product_variation_id, amount) values (1363, 15);
      insert into inventory (product_variation_id, amount) values (1364, 76);
      insert into inventory (product_variation_id, amount) values (1365, 43);
      insert into inventory (product_variation_id, amount) values (1366, 49);
      insert into inventory (product_variation_id, amount) values (1367, 100);
      insert into inventory (product_variation_id, amount) values (1368, 53);
      insert into inventory (product_variation_id, amount) values (1369, 47);
      insert into inventory (product_variation_id, amount) values (1370, 7);
      insert into inventory (product_variation_id, amount) values (1371, 67);
      insert into inventory (product_variation_id, amount) values (1372, 96);
      insert into inventory (product_variation_id, amount) values (1373, 96);
      insert into inventory (product_variation_id, amount) values (1374, 15);
      insert into inventory (product_variation_id, amount) values (1376, 50);
      insert into inventory (product_variation_id, amount) values (1377, 78);
      insert into inventory (product_variation_id, amount) values (1378, 21);
      insert into inventory (product_variation_id, amount) values (1379, 10);
      insert into inventory (product_variation_id, amount) values (1380, 90);
      insert into inventory (product_variation_id, amount) values (1381, 100);
      insert into inventory (product_variation_id, amount) values (1382, 99);
      insert into inventory (product_variation_id, amount) values (1383, 49);
      insert into inventory (product_variation_id, amount) values (1384, 57);
      insert into inventory (product_variation_id, amount) values (1385, 31);
      insert into inventory (product_variation_id, amount) values (1386, 68);
      insert into inventory (product_variation_id, amount) values (1387, 38);
      insert into inventory (product_variation_id, amount) values (1388, 59);
      insert into inventory (product_variation_id, amount) values (1390, 32);
      insert into inventory (product_variation_id, amount) values (1392, 80);
      insert into inventory (product_variation_id, amount) values (1393, 43);
      insert into inventory (product_variation_id, amount) values (1394, 22);
      insert into inventory (product_variation_id, amount) values (1395, 60);
      insert into inventory (product_variation_id, amount) values (1396, 38);
      insert into inventory (product_variation_id, amount) values (1397, 78);
      insert into inventory (product_variation_id, amount) values (1398, 13);
      insert into inventory (product_variation_id, amount) values (1399, 65);
      insert into inventory (product_variation_id, amount) values (1400, 51);
      insert into inventory (product_variation_id, amount) values (1401, 94);
      insert into inventory (product_variation_id, amount) values (1402, 17);
      insert into inventory (product_variation_id, amount) values (1403, 79);
      insert into inventory (product_variation_id, amount) values (1404, 77);
      insert into inventory (product_variation_id, amount) values (1405, 13);
      insert into inventory (product_variation_id, amount) values (1406, 79);
      insert into inventory (product_variation_id, amount) values (1407, 10);
      insert into inventory (product_variation_id, amount) values (1408, 31);
      insert into inventory (product_variation_id, amount) values (1409, 51);
      insert into inventory (product_variation_id, amount) values (1410, 47);
      insert into inventory (product_variation_id, amount) values (1411, 94);
      insert into inventory (product_variation_id, amount) values (1412, 77);
      insert into inventory (product_variation_id, amount) values (1414, 50);
      insert into inventory (product_variation_id, amount) values (1415, 97);
      insert into inventory (product_variation_id, amount) values (1416, 74);
      insert into inventory (product_variation_id, amount) values (1417, 76);
      insert into inventory (product_variation_id, amount) values (1418, 55);
      insert into inventory (product_variation_id, amount) values (1419, 2);
      insert into inventory (product_variation_id, amount) values (1420, 96);
      insert into inventory (product_variation_id, amount) values (1421, 47);
      insert into inventory (product_variation_id, amount) values (1422, 47);
      insert into inventory (product_variation_id, amount) values (1423, 7);
      insert into inventory (product_variation_id, amount) values (1424, 57);
      insert into inventory (product_variation_id, amount) values (1425, 79);
      insert into inventory (product_variation_id, amount) values (1426, 6);
      insert into inventory (product_variation_id, amount) values (1427, 88);
      insert into inventory (product_variation_id, amount) values (1428, 18);
      insert into inventory (product_variation_id, amount) values (1429, 59);
      insert into inventory (product_variation_id, amount) values (1430, 30);
      insert into inventory (product_variation_id, amount) values (1431, 58);
      insert into inventory (product_variation_id, amount) values (1432, 6);
      insert into inventory (product_variation_id, amount) values (1433, 1);
      insert into inventory (product_variation_id, amount) values (1434, 32);
      insert into inventory (product_variation_id, amount) values (1435, 18);
      insert into inventory (product_variation_id, amount) values (1436, 33);
      insert into inventory (product_variation_id, amount) values (1437, 51);
      insert into inventory (product_variation_id, amount) values (1438, 8);
      insert into inventory (product_variation_id, amount) values (1439, 65);
      insert into inventory (product_variation_id, amount) values (1440, 54);
      insert into inventory (product_variation_id, amount) values (1441, 77);
      insert into inventory (product_variation_id, amount) values (1442, 1);
      insert into inventory (product_variation_id, amount) values (1443, 42);
      insert into inventory (product_variation_id, amount) values (1444, 13);
      insert into inventory (product_variation_id, amount) values (1445, 82);
      insert into inventory (product_variation_id, amount) values (1446, 3);
      insert into inventory (product_variation_id, amount) values (1447, 11);
      insert into inventory (product_variation_id, amount) values (1448, 84);
      insert into inventory (product_variation_id, amount) values (1449, 86);
      insert into inventory (product_variation_id, amount) values (1450, 87);
      insert into inventory (product_variation_id, amount) values (1451, 9);
      insert into inventory (product_variation_id, amount) values (1452, 85);
      insert into inventory (product_variation_id, amount) values (1453, 43);
      insert into inventory (product_variation_id, amount) values (1454, 96);
      insert into inventory (product_variation_id, amount) values (1455, 5);
      insert into inventory (product_variation_id, amount) values (1456, 100);
      insert into inventory (product_variation_id, amount) values (1457, 13);
      insert into inventory (product_variation_id, amount) values (1458, 7);
      insert into inventory (product_variation_id, amount) values (1459, 29);
      insert into inventory (product_variation_id, amount) values (1460, 100);
      insert into inventory (product_variation_id, amount) values (1461, 92);
      insert into inventory (product_variation_id, amount) values (1462, 24);
      insert into inventory (product_variation_id, amount) values (1463, 68);
      insert into inventory (product_variation_id, amount) values (1464, 40);
      insert into inventory (product_variation_id, amount) values (1465, 21);
      insert into inventory (product_variation_id, amount) values (1466, 55);
      insert into inventory (product_variation_id, amount) values (1467, 10);
      insert into inventory (product_variation_id, amount) values (1468, 12);
      insert into inventory (product_variation_id, amount) values (1469, 4);
      insert into inventory (product_variation_id, amount) values (1470, 99);
      insert into inventory (product_variation_id, amount) values (1471, 56);
      insert into inventory (product_variation_id, amount) values (1472, 88);
      insert into inventory (product_variation_id, amount) values (1473, 81);
      insert into inventory (product_variation_id, amount) values (1474, 68);
      insert into inventory (product_variation_id, amount) values (1475, 40);
      insert into inventory (product_variation_id, amount) values (1476, 99);
      insert into inventory (product_variation_id, amount) values (1477, 84);
      insert into inventory (product_variation_id, amount) values (1478, 13);
      insert into inventory (product_variation_id, amount) values (1479, 22);
      insert into inventory (product_variation_id, amount) values (1480, 90);
      insert into inventory (product_variation_id, amount) values (1481, 33);
      insert into inventory (product_variation_id, amount) values (1482, 87);
      insert into inventory (product_variation_id, amount) values (1483, 73);
      insert into inventory (product_variation_id, amount) values (1484, 51);
      insert into inventory (product_variation_id, amount) values (1485, 60);
      insert into inventory (product_variation_id, amount) values (1486, 8);
      insert into inventory (product_variation_id, amount) values (1487, 86);
      insert into inventory (product_variation_id, amount) values (1488, 95);
      insert into inventory (product_variation_id, amount) values (1489, 99);
      insert into inventory (product_variation_id, amount) values (1490, 94);
      insert into inventory (product_variation_id, amount) values (1491, 17);
      insert into inventory (product_variation_id, amount) values (1492, 3);
      insert into inventory (product_variation_id, amount) values (1493, 5);
      insert into inventory (product_variation_id, amount) values (1494, 97);
      insert into inventory (product_variation_id, amount) values (1495, 15);
      insert into inventory (product_variation_id, amount) values (1496, 46);
      insert into inventory (product_variation_id, amount) values (1497, 92);
      insert into inventory (product_variation_id, amount) values (1498, 11);
      insert into inventory (product_variation_id, amount) values (1499, 48);
      insert into inventory (product_variation_id, amount) values (1500, 10);
      `)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('DELETE FROM INVENTORY')
	}
}
