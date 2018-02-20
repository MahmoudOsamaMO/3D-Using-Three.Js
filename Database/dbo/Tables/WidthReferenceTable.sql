CREATE TABLE [dbo].[WidthReferenceTable] (
    [ID_WidthReference] INT            IDENTITY (1, 1) NOT NULL,
    [WidthReference]    NVARCHAR (100) NULL,
    CONSTRAINT [PK_WidthReferenceTable] PRIMARY KEY CLUSTERED ([ID_WidthReference] ASC)
);

