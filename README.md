# SMS Archive Viewer

Personal purpose XML SMS Archive viewer. 

## Supported format

```xml
<xs:schema id="SmsDataSet" targetNamespace="http://tempuri.org/SMS.xsd" xmlns:mstns="http://tempuri.org/SMS.xsd" xmlns="http://tempuri.org/SMS.xsd" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:msdata="urn:schemas-microsoft-com:xml-msdata" attributeFormDefault="qualified" elementFormDefault="qualified">
        <xs:element name="SmsDataSet" msdata:IsDataSet="true" msdata:UseCurrentLocale="true">
            <xs:complexType>
                <xs:choice minOccurs="0" maxOccurs="unbounded">
                    <xs:element name="Sms">
                        <xs:complexType>
                            <xs:sequence>
                                <xs:element name="Id" msdata:AutoIncrement="true" type="xs:int" />
                                <xs:element name="Numbers" type="xs:string" minOccurs="0" />
                                <xs:element name="Subject" type="xs:string" minOccurs="0" />
                                <xs:element name="Body" type="xs:string" minOccurs="0" />
                                <xs:element name="SmsType" type="xs:int" />
                                <xs:element name="Time" type="xs:dateTime" minOccurs="0" />
                                <xs:element name="MMSData" type="xs:base64Binary" minOccurs="0" />
                                <xs:element name="ContactId" type="xs:int" minOccurs="0" />
                                <xs:element name="ContactName" type="xs:string" minOccurs="0" />
                                <xs:element name="FolderId" type="xs:int" minOccurs="0" />
                                <xs:element name="ThreadId" type="xs:int" minOccurs="0" />
                                <xs:element name="Status" type="xs:int" />
                                <xs:element name="ChatType" type="xs:int" default="0" minOccurs="0" />
                                <xs:element name="Locked" type="xs:boolean" minOccurs="0" />
                            </xs:sequence>
                        </xs:complexType>
                    </xs:element>
                    <xs:element name="SmsFolders">
                        <xs:complexType>
                            <xs:sequence>
                                <xs:element name="Id" msdata:AutoIncrement="true" type="xs:int" />
                                <xs:element name="ParentId" type="xs:int" minOccurs="0" />
                                <xs:element name="Title" type="xs:string" />
                            </xs:sequence>
                        </xs:complexType>
                    </xs:element>
                    <xs:element name="SmsPieces">
                        <xs:complexType>
                            <xs:sequence>
                                <xs:element name="Id" msdata:AutoIncrement="true" type="xs:int" />
                                <xs:element name="SmsId" type="xs:int" />
                                <xs:element name="PartId" type="xs:int" minOccurs="0" />
                                <xs:element name="MimeType" type="xs:string" minOccurs="0" />
                                <xs:element name="Data" type="xs:base64Binary" minOccurs="0" />
                            </xs:sequence>
                        </xs:complexType>
                    </xs:element>
                    <xs:element name="SmsThread">
                        <xs:complexType>
                            <xs:sequence>
                                <xs:element name="Id" msdata:AutoIncrement="true" type="xs:int" />
                                <xs:element name="MessageCount" type="xs:string" minOccurs="0" />
                                <xs:element name="Snippet" type="xs:string" minOccurs="0" />
                                <xs:element name="OutDirection" type="xs:boolean" default="false" minOccurs="0" />
                                <xs:element name="Time" type="xs:dateTime" minOccurs="0" />
                                <xs:element name="Numbers" type="xs:string" minOccurs="0" />
                                <xs:element name="AllRead" type="xs:boolean" minOccurs="0" />
                                <xs:element name="ContactId" type="xs:string" minOccurs="0" />
                                <xs:element name="Label" type="xs:string" minOccurs="0" />
                                <xs:element name="DisplayName" type="xs:string" minOccurs="0" />
                            </xs:sequence>
                        </xs:complexType>
                    </xs:element>
                    <xs:element name="SmsAttachment">
                        <xs:complexType>
                            <xs:sequence>
                                <xs:element name="Id" msdata:AutoIncrement="true" type="xs:int" />
                                <xs:element name="SmsId" type="xs:int" />
                                <xs:element name="FilePath" type="xs:string" minOccurs="0" />
                                <xs:element name="DataColumn1" type="xs:string" minOccurs="0" />
                            </xs:sequence>
                        </xs:complexType>
                    </xs:element>
                </xs:choice>
            </xs:complexType>
            <xs:unique name="Constraint1" msdata:PrimaryKey="true">
                <xs:selector xpath=".//mstns:Sms" />
                <xs:field xpath="mstns:Id" />
            </xs:unique>
            <xs:unique name="SmsFolders_Constraint1" msdata:ConstraintName="Constraint1" msdata:PrimaryKey="true">
                <xs:selector xpath=".//mstns:SmsFolders" />
                <xs:field xpath="mstns:Id" />
            </xs:unique>
            <xs:unique name="SmsPieces_Constraint1" msdata:ConstraintName="Constraint1" msdata:PrimaryKey="true">
                <xs:selector xpath=".//mstns:SmsPieces" />
                <xs:field xpath="mstns:Id" />
                <xs:field xpath="mstns:SmsId" />
            </xs:unique>
            <xs:unique name="SmsThread_Constraint1" msdata:ConstraintName="Constraint1" msdata:PrimaryKey="true">
                <xs:selector xpath=".//mstns:SmsThread" />
                <xs:field xpath="mstns:Id" />
            </xs:unique>
            <xs:unique name="SmsAttachmentKey1" msdata:PrimaryKey="true">
                <xs:selector xpath=".//mstns:SmsAttachment" />
                <xs:field xpath="mstns:Id" />
            </xs:unique>
            <xs:keyref name="FK_Sms_SmsPieces" refer="Constraint1">
                <xs:selector xpath=".//mstns:SmsPieces" />
                <xs:field xpath="mstns:SmsId" />
            </xs:keyref>
            <xs:keyref name="FK_SmsFolders_Sms" refer="SmsFolders_Constraint1" msdata:AcceptRejectRule="Cascade">
                <xs:selector xpath=".//mstns:Sms" />
                <xs:field xpath="mstns:FolderId" />
            </xs:keyref>
        </xs:element>
        <xs:annotation>
            <xs:appinfo>
                <msdata:Relationship name="Sms_SmsAttachment" msdata:parent="Sms" msdata:child="SmsAttachment" msdata:parentkey="Id" msdata:childkey="SmsId" />
                <msdata:Relationship name="Sms_SmsThread" msdata:parent="SmsThread" msdata:child="Sms" msdata:parentkey="Id" msdata:childkey="ThreadId" />
            </xs:appinfo>
        </xs:annotation>
    </xs:schema>
```

## Getting started

1. Clone or download the source code.
2. Run `npm install` (nodejs required)
3. Run `npm start` to launch the app
4. On first startup, a dialog window pops up. Browse your disks and select the XML archive file. You can change file later by clicking on the "settings" icon.