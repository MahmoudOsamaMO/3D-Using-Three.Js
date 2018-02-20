CREATE TABLE [dbo].[WindSpeedEnumTable] (
    [WindSpeedEnum_ID] INT            IDENTITY (1, 1) NOT NULL,
    [WindSpeedEnum]    NVARCHAR (150) NULL,
    CONSTRAINT [PK_WindSpeedEnumTable] PRIMARY KEY CLUSTERED ([WindSpeedEnum_ID] ASC)
);

