CREATE TABLE [dbo].[WindExposureTable] (
    [WindExposure_ID] INT            IDENTITY (1, 1) NOT NULL,
    [WindExposure]    NVARCHAR (150) NULL,
    CONSTRAINT [PK_WindExposureTable] PRIMARY KEY CLUSTERED ([WindExposure_ID] ASC)
);

